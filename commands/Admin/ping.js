module.exports = {
    enabled: true,
    name: 'ping',
    aliases: ['pong', 'pingpong'],
    description: 'Pong!',
    minArgs: 0,
    maxArgs: null,
    permissions: ["ADMINISTRATOR"],
    requiredRoles: [],
    run: (message) => {
        message.reply(message.client.language.ping(message.client, message.author));
    }
};