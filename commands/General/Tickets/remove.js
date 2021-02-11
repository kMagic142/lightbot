module.exports = {
    enabled: true,
    name: 'ticket remove',
    aliases: ['tremove'],
    description: 'Remove a person from your open ticket.',
    expectedArgs: '<@Member>',
    minArgs: 1,
    maxArgs: 1,
    permissions: [],
    requiredRoles: [],
    run: (message) => {
        let client = message.client;
        let user = message.mentions.members.first() || null;

        if(!user) {
            return message.channel.send(client.language.tickets.remove.incorrectUsage());
        }

        if (!message.channel.name.startsWith(`ticket-`)) {
            return message.channel.send(client.language.tickets.remove.notTicketChannel());
        }

        message.channel.updateOverwrite(user.id,
            {
                VIEW_CHANNEL: null,
                SEND_MESSAGES: null
            },
        'Removed a member to a ticket.');

        return message.channel.send(client.language.tickets.remove.success(user));

    }
};