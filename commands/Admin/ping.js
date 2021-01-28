module.exports = {
    enabled: true,
    name: 'ping',
    aliases: ['pong', 'pingpong'],
    description: 'Pong!',
    minArgs: 0,
    maxArgs: null,
    permissions: [],
    requiredRoles: [],
    run: (message) => {
        message.reply(message.client.language.ping(message.client, message.author));
    }
};