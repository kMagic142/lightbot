const Data = require('../../data/Data.js');

module.exports = {
    enabled: true,
    name: 'serverstatus setup',
    description: 'Setup Server Status category.',
    expectedArgs: '<[enable/disable]>',
    minArgs: 0,
    maxArgs: 1,
    permissions: ["MANAGE_GUILD"],
    requiredRoles: [],
    run: async (message, args) => {
        let channel = message.channel;
        let client = message.client;
        var guild = await Data.getServerStatus(message.guild.id);

        if(args[0]) {
            switch(args[0]) {
                case "enable":
                    if(!guild.category) {
                        channel.send(client.language.serverStatus.noCategoryID());
                        return Data.setServerStatus(message.guild.id, null, 1);
                    }

                    if(guild.enabled) {
                        return channel.send(client.language.serverStatus.status(false));
                    }

                    Data.setServerStatus(message.guild.id, null, 1);
                    guild = await Data.getServerStatus(message.guild.id);

                    channel.send(client.language.serverStatus.status(1));

                    break;
                case "disable":
                    if(!guild.serverStatus.enabled) {
                        return channel.send(client.language.serverStatus.status(false));
                    }

                    Data.setServerStatus(message.guild.id, null, 0);
                    guild = await Data.getServerStatus(message.guild.id);

                    channel.send(client.language.serverStatus.status(0));

                    break;

            }
        }

        if(!guild.enabled) {
            return channel.send(client.language.serverStatus.disabled(message, client));
        }


        let msg = await channel.send(client.language.serverStatus.setup.categorySetup(client, message));
        msg.react('⛔');

        let collectorFilter = m => m.author.id === message.author.id;
        const messageCollector = channel.createMessageCollector(collectorFilter, { time: 60000 });

        let reactionFilter = (_reaction, user) => user.id === message.author.id;
        const reactionCollector = msg.createReactionCollector(reactionFilter, { time: 60000 });
        reactionCollector.on('collect', r => {
            msg.reactions.cache.forEach(r => r.remove());
            messageCollector.stop('cancel');
            return reactionCollector.stop();
        });


        messageCollector.on('collect', async (m) => {
            var sscategory;

            try {
                sscategory = message.guild.channels.cache.get(m.content);
                if(!sscategory) throw TypeError();
            } catch(e) {
                sscategory = message.guild.channels.cache.find(c => c.name === m.content || c.id === m.content);
                if(!sscategory) {
                    channel.send(client.language.serverStatus.setup.invalidCategory(m.content, m, client));
                    return messageCollector.stop();
                }
            }

            if(sscategory.type !== "category") {
                channel.send(client.language.serverStatus.setup.invalidCategory(m.content, m, client));
                return messageCollector.stop();
            }

            Data.setServerStatus(message.guild.id, sscategory.id, 1);

            channel.send(client.language.serverStatus.setup.success(sscategory, message, client));

            let category = await guild.channels.create('Server Stats', {
                type: 'category',
                permissionOverwrites: [
                    {
                      id: guild.roles.everyone,
                      deny: "CONNECT",
                   }
                ]
            });

            let humans = await guild.channels.create(`Members: ${guild.members.find(u => !u.bot).size}`, { type: 'voice', parent: category });
            let bots = await guild.channels.create(`Bots: ${guild.members.find(u => u.bot).size}`, { type: 'voice', parent: category });
            let total = await guild.channels.create(`Total: ${guild.members.find(u => !u.bot).size + guild.members.find(u => u.bot).size}`, { type: 'voice', parent: category });

            Data.setServerStatusChannels(humans, bots, total);

            return messageCollector.stop();
        });



        messageCollector.on('end', async (_collected, reason) => {
            if(reason === "time") {
                Data.setServerStatus(message.guild.id, null, 0);
                return channel.send(client.language.serverStatus.setup.timeError());
            } else if(reason === "cancel") {
                Data.setServerStatus(message.guild.id, null, 0);
                return channel.send(client.language.serverStatus.setup.canceled());
            }
        });
    }
};