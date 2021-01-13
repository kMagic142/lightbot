const fs = require('fs');

module.exports = {
    name: 'onGuildLeave',
    enabled: true,
    run: async (client) => {
        client.on('guildDelete', async (guild) => {
            if(client.guildData.has(guild.id)) {
                await fs.unlinkSync(`./Storage/guilds/${guild.id}.json`)
            }
        });
    }
}