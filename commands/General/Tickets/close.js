module.exports = {
    enabled: true,
    name: 'ticket close',
    aliases: ['tclose'],
    description: 'Close an active ticket',
    minArgs: 0,
    maxArgs: null,
    permissions: [],
    requiredRoles: [],
    run: (message, args, text) => {
        let client = message.client;

        if (!message.channel.name.startsWith(`ticket-`)) {
            return message.channel.send(client.language.tickets.close.notTicketChannel());
        }

        return message.channel.send(client.language.tickets.close.success())
        .then(async () => {
            await setTimeout(async () => {
                await message.channel.delete();
            }, 60000);
        });
    }
};