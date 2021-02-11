let moment = require('moment');
moment.suppressDeprecationWarnings = true;

module.exports = {
    enabled: true,
    name: 'invite info',
    aliases: ['inv info'],
    description: 'Display informations about given invite.',
    expectedArgs: '<inviteCode>',
    minArgs: 1,
    maxArgs: 2,
    permissions: [],
    requiredRoles: [],
    run: async (message, args) => {
        let client = message.client;

        let invite = await message.guild.fetchInvites();
        
        invite = invite.get(args[0]);

        if(!invite) {
            return message.channel.send(client.language.invites.invalid());
        }

        message.channel.send(client.language.invites.info(
            invite.uses, 
            moment(invite.createdAt).utc().format("dddd, MMMM Do YYYY, h:mm A"),
            invite.inviter
        ));
    }
};