const Data = require('../../../data/Data');

module.exports = {
    enabled: true,
    name: 'unwarn',
    aliases: ['remwarn'],
    description: 'See a guild member\'s warnings.',
    expectedArgs: '<@Member> [warnID]',
    minArgs: 1,
    maxArgs: 2,
    permissions: ['MANAGE_MESSAGES'],
    requiredRoles: [],
    run: async (message, args) => {
        const client = message.client;
        var user = message.mentions.members.first().user || null;
        let warnid = args[1] || null;

        if(!user) message.channel.send(client.language.warn.invalidUser());
        let warn = client.userData.get(user.id).warnings.filter(w => w.guild === message.guild.id && w.id === warnid) || null;

        if(warn) {
            if(!warnid) {
                warn = client.userData.get(user.id).warnings[client.userData.get(user.id).warnings.length - 1];
            }

            Data.removeWarn(user.id, warn.id, message.guild.id);
            try {
                let channel = await message.guild.channels.cache.get(await Data.getWarnsChannel(message.guild.id));
                channel.send(client.language.warnlogs.unwarn(message.author, user, warn.id));
            } catch(e) {
                // ignore
            }

            return message.react('✅');
        } else {
            return message.react('❌');
        }


        
    }
};