const Data = require('../../data/Data.js');

module.exports = {
    enabled: true,
    name: 'joinleave',
    aliases: ['welcomemsg', 'setupjoinleave'],
    description: 'Setup join/leave messages.',
    expectedArgs: '<[enable/disable]>',
    minArgs: 0,
    maxArgs: 1,
    permissions: ["MANAGE_GUILD"],
    requiredRoles: [],
    run: async (message, args) => {
        let channel = message.channel;
        let client = message.client;
        var guild = await Data.getJoinLeave(message.guild.id);

        if(args[0]) {
            switch(args[0]) {
                case "enable":
                    if(!guild.channel) {
                        channel.send(client.language.joinLeave.noChannelID());
                        return Data.setJoinLeave(message.guild.id, null, 1);
                    }

                    if(guild.enabled) {
                        return channel.send(client.language.joinLeave.status(false));
                    }

                    Data.setJoinLeave(message.guild.id, null, 1);
                    guild = await Data.getJoinLeave(message.guild.id);

                    channel.send(client.language.joinLeave.status(1));

                    break;
                case "disable":
                    if(!guild.joinLeave.enabled) {
                        return channel.send(client.language.joinLeave.status(false));
                    }

                    Data.setJoinLeave(message.guild.id, null, 0);
                    guild = await Data.getJoinLeave(message.guild.id);

                    channel.send(client.language.joinLeave.status(0));

                    break;

            }
        }

        if(!guild.enabled) {
            return channel.send(client.language.joinLeave.disabled(message, client));
        }


        let msg = await channel.send(client.language.joinLeave.setup.channelSetup(client, message));
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
            var jlchannel;
            var content = m.mentions.channels.first();

            try {
                jlchannel = message.guild.channels.cache.get(content.id);
                if(!jlchannel) throw TypeError();
            } catch(e) {
                jlchannel = message.guild.channels.cache.find(c => c.name === m.content || c.id === m.content);
                if(!jlchannel) {
                    channel.send(client.language.joinLeave.setup.invalidChannel(m.content, m, client));
                    return messageCollector.stop();
                }
            }

            Data.setJoinLeave(message.guild.id, jlchannel.id, 1);

            channel.send(client.language.joinLeave.setup.success(jlchannel, message, client));

            return messageCollector.stop();
        });

        messageCollector.on('end', async (_collected, reason) => {
            if(reason === "time") {
                Data.setJoinLeave(message.guild.id, null, 0);
                return channel.send(client.language.joinLeave.setup.timeError());
            } else if(reason === "cancel") {
                Data.setJoinLeave(message.guild.id, null, 0);
                return channel.send(client.language.joinLeave.setup.canceled());
            }
        });
    }
};