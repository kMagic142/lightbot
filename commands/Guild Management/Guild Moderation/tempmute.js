const ms = require('ms');

module.exports = {
    enabled: true,
    name: 'tempmute',
    aliases: 'mute',
    description: 'Temporarly restrict a member\'s access to send messages in channels.',
    expectedArgs: '<@Member> [Time<s, m, h, w, ...>]',
    minArgs: 1,
    maxArgs: 3,
    permissions: ['MANAGE_MESSAGES'],
    requiredRoles: [],
    run: async (message, args, text) => {
        const client = message.client;
        let time = args[1];

        if (!message.guild.members.cache.get(client.user.id).hasPermission('MANAGE_ROLES')) 
        return message.channel.send(client.language.mute.noPermission());

        if(message.mentions.members.size < 1)
        return message.channel.send(client.language.mute.incorrectUsage());

        try {
            ms(time);
        } catch(err) {
            time = "99999y";
        }

        var user = message.mentions.members.first();

        var role = message.guild.roles.cache.find(r => r.name === "Muted") || null;


        if(!role) {
            await message.guild.roles.create({
    			name: 'Muted',
                color: [179, 179, 179]
            })

            .then((role) =>{
                message.guild.channels.cache
                .filter(c => c.type === "text")
                .forEach(c => {
                    c.updateOverwrite(role.id, {
                        SEND_MESSAGES: false
                    });
                });

                if(time === "99999y") {
                    user.roles.add(role.id);
                    return message.channel.send(client.language.mute.muted(user.user, "Forever"));
                }

                user.roles.add(role.id);
                message.channel.send(client.language.mute.muted(user.user, ms(ms(`${time}`, {long: true}), {long: true})));

                let interval = setInterval(() => {
                    if(!user.roles.cache.has(role.id)) {
                        clearTimeout(timeout);
                    }
                });

                let timeout = setTimeout(() => {
                    user.roles.remove(role.id);
                    clearInterval(interval);
                    return message.channel.send(client.language.mute.unmuted(user.user));
                }, ms(time, { long:true }));
            });
            
        } else {
            if(time === "99999y") {
                user.roles.add(role.id);
                return message.channel.send(client.language.mute.muted(user.user, "Forever"));
            }

            user.roles.add(role.id);
            message.channel.send(client.language.mute.muted(user.user, ms(ms(`${time}`, {long: true}), {long: true})));

            setTimeout(() => {
                user.roles.remove(role.id);
                return message.channel.send(client.language.mute.unmuted(user.user));
            }, ms(time, { long:true }));
        }

    }
};