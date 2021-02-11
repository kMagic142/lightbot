module.exports = {
    enabled: true,
    name: 'unmute',
    aliases: [],
    description: 'Unmute a guild member.',
    expectedArgs: '<@Member>',
    minArgs: 1,
    maxArgs: 2,
    permissions: ['MANAGE_MESSAGES'],
    requiredRoles: [],
    run: async (message) => {
        const client = message.client;
        var role = message.guild.roles.cache.find(r => r.name === "Muted") || null;
        var user = message.mentions.members.first() || null;

        if(role && user) {
            await user.roles.remove(role)
            .catch(err => {
                if(err) console.log(err);
                return message.channel.send(client.language.mute.notMuted(user.user));
            });
        
            return message.channel.send(client.language.mute.unmuted(user.user));
        } else {
            return message.channel.send(client.language.mute.noMuteRole());
        }
    }
};