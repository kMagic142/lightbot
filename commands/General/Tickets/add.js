module.exports = {
    enabled: true,
    name: 'ticket add',
    aliases: ['tadd'],
    description: 'Add another person to your open ticket.',
    expectedArgs: '<@Member>',
    minArgs: 1,
    maxArgs: 1,
    permissions: [],
    requiredRoles: [],
    run: (message) => {
        let client = message.client;
        let user = message.mentions.members.first() || null;

        if(!user) {
            return message.channel.send(client.language.tickets.add.incorrectUsage());
        }

        if (!message.channel.name.startsWith(`ticket-`)) {
            return message.channel.send(client.language.tickets.add.notTicketChannel());
        }

        message.channel.updateOverwrite(user.id,
            {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            },
        'Added a member to a ticket.');

        return message.channel.send(client.language.tickets.add.success(user));

    }
};