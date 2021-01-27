module.exports = {
    enabled: true,
    name: 'social exp info',
    aliases: ['xp info', 'xp'],
    description: 'Display informations about user\'s gathered exp.',
    expectedArgs: '<[@Member]>',
    minArgs: 0,
    maxArgs: 1,
    permissions: [],
    requiredRoles: [],
    run: (message) => {
        let client = message.client;

        let user = message.mentions.members.first() || message.author;

        message.channel.send(client.language.experience.info(client.userData.get(user.id).experience));
    }
};