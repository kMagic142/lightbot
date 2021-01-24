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
        let client = message.client;

        message.channel.send(`Your EXP is: ${client.userData.get(message.author.id).experience}`);
    }
};