module.exports = {
    enabled: true,
    name: 'exp leaderboard',
    aliases: ['xp leaderboard'],
    description: 'Display this server\'s top players in gathered exp.',
    minArgs: 0,
    maxArgs: null,
    permissions: [],
    requiredRoles: [],
    run: (message, args, text) => {
        message.reply(message.client.language.ping(message.client, message.author));
    }
};