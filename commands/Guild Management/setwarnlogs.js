const Data = require("../../data/Data.js");

module.exports = {
    enabled: true,
    name: 'setwarnlogs',
    aliases: 'setwarnschannel',
    description: 'Sets the guild\'s warns log channel.',
    minArgs: 0,
    maxArgs: null,
    permissions: ["MANAGE_GUILD"],
    requiredRoles: [],
    run: async (message) => {
        var client = message.client;

        let msg = await message.channel.send(client.language.warnlogs.setup.channelSetup(client, message));
        await msg.react('⛔');

        let collectorFilter = m => m.author.id === message.author.id;
        const messageCollector = message.channel.createMessageCollector(collectorFilter, { time: 60000 });

        let reactionFilter = (_reaction, user) => user.id === message.author.id;
        const reactionCollector = msg.createReactionCollector(reactionFilter, { time: 60000 });
        reactionCollector.on('collect', () => {
            msg.reactions.removeAll();
            messageCollector.stop('cancel');
            return reactionCollector.stop();
        });


        messageCollector.on('collect', async (m) => {
            var wlchannel;

            try {
                wlchannel = message.guild.channels.cache.get(m.content);
                if(wlchannel === undefined) {
                    throw TypeError();
                }
            } catch(e) {
                if(e instanceof TypeError) {
                    wlchannel = message.guild.channels.cache.find(c => c.name === m.content.replace("#", ""));
                    if(jlchannel === undefined) {
                        message.channel.send(client.language.warnlogs.setup.invalidChannel(m.content, m, client));
                        return messageCollector.stop();
                    }
                } else {
                    if(e) throw e;
                }
            }

            Data.setWarnLogs(message.guild.id, wlchannel.id);

            message.channel.send(client.language.warnlogs.setup.success(wlchannel, message, client));

            return messageCollector.stop();
        });

        messageCollector.on('end', async (_collected, reason) => {
            if(reason === "time") {
                return message.channel.send(client.language.warnlogs.setup.timeError());
            } else if(reason === "cancel") {
                return message.channel.send(client.language.warnlogs.setup.canceled());
            }
        });

    }
};