const Data = require("../data/Data");
const fs = require('fs');
const handleInvites = require('../handlers/handleInvites');

module.exports = {
    name: 'onMemberJoin',
    enabled: true,
    run: async (client) => {
        client.on('guildMemberAdd', async (member) => {
            let guild = member.guild;
            if(!guild.available) return;


            client.userData.set(member.id, {
                experience: 0,
                level: 0
            });

            await fs.writeFileSync(`./Storage/users/${member.id}.json`, client.userData.get(member.id));

            if(await Data.getServerStatus(guild.id).enabled) {
                let humans = guild.members.cache.filter(m => !m.bot).size;
                let bots = guild.members.cache.filter(m => m.bot).size;
                let channels = client.config.serverStatus.channels;

                for(let channel of channels) {
                    let ch = guild.channels.get(channel.id);
                    if(!ch) continue;

                    switch(true) {
                        case channel.type === "humans":
                            ch.setName(`${ch.name.split(" ")[0]} ${humans}`);
                            break;
                        case channel.type === "bots":
                            ch.setName(`${ch.name.split(" ")[0]} ${bots}`);
                            break;
                        case channel.type === "humans":
                            ch.setName(`${ch.name.split(" ")[0]} ${total}`);
                            break;
                    }
                }
            }

            if(await Data.getJoinLeave(guild.id).enabled) {
                let channel = Data.getJoinLeave(guild.id).channel;

                if(!channel) {
                    return;
                }

                channel = member.guild.channels.cache.get(channel);
                await channel.send(client.language.joinLeave.joinMessage(member, client));
            }

            if(await Data.getInviteRewards(member.guild.id).enabled) {
                member.guild.fetchInvites().then(guildInvites => {
                    let invites = client.guildInvites.get(member.guild.id);

                    client.guildInvites.set(member.guild.id, guildInvites);

                    let invite = guildInvites.find(i => invites.get(i.code).uses < i.uses);

                    if(invite) {
                        handleInvites(invite);
                    }
                });
            }
        });
    }
};