const Data = require("../data/Data");

module.exports = {
    name: 'onMemberJoin',
    enabled: true,
    run: async (client) => {
        client.on('guildMemberAdd', async (member) => {
            let guild = member.guild;
            if(!guild.available) return;

            client.userData.set(member.id, {
                experience: 0,
                level: 0,
                coins: 0
            });

            fs.writeFileSync(`./Storage/users/${member.id}.json`, client.userData.get(member.id));

            if(Data.getJoinLeave(guild.id).enabled) {
                let channel = Data.getJoinLeave(guild.id).channel;

                if(!channel) {
                    return;
                }

                channel = member.guild.channels.cache.get(channel);

                await channel.send(client.language.joinLeave.joinMessage(member, client));
            }
        });
    }
};