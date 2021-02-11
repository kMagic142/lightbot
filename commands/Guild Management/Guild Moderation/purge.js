module.exports = {
    enabled: true,
    name: 'purge',
    aliases: ['prune', 'clear'],
    description: 'Clear a set amount of messages. (less than 100)',
    expectedArgs: '<Amount>',
    minArgs: 1,
    maxArgs: 2,
    permissions: ['MANAGE_MESSAGES'],
    requiredRoles: [],
    run: async (message, args) => {
        const client = message.client;
        var messages = parseInt(args[0]);
        
        if(Number.isNaN(messages)) return message.channel.send(client.language.purge.incorrectUsage());

        if(messages >= 100) return message.channel.send(client.language.purge.incorrectUsage());
        await message.channel.bulkDelete(messages);
    }
};