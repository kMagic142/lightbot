module.exports = {
    enabled: true,
    name: 'exp info',
    aliases: ['xp info', 'xp'],
    description: 'Display informations about user\'s gathered exp.',
    expectedArgs: '<[@Member]>',
    minArgs: 0,
    maxArgs: 1,
    permissions: [],
    requiredRoles: [],
    run: (message, args, text) => {
        message.reply(message.client.language.ping(message.client, message.author));
    }
};