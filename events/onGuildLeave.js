const fs = require('fs');
const Data = require('../data/Data.js');

module.exports = {
    name: 'onGuildLeave',
    enabled: true,
    run: async (client) => {
        client.on('guildDelete', async (guild) => {
            if(await Data.getGuild(guild.id)) {
                Data.deleteGuild(guild.id);
            }
        });
    }
};