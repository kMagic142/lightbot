const Data = require("../data/Data");

module.exports = {
    name: 'onMemberJoin',
    enabled: true,
    run: async (client) => {
        client.on('guildMemberAdd', async (member) => {
            let guild = member.guild;
            if(!guild.available) return;

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