const fs = require('fs');

module.exports = {
    name: 'onGuildJoin',
    enabled: true,
    run: async (client) => {
        client.on('guildCreate', async (guild) => {
            if(!guild.available) return console.log("[Light] An error occured. Light joined a guild that isn't' available to him. Please wait a bit and try again later.");

            if(!client.guildData.has(guild.id)) {
                fs.writeFileSync(`./Storage/guilds/${guild.id}.json`, '{}', (err) => {
                    if(err) throw err;
                });
            }
        });
    }
}