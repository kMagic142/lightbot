const fs = require('fs');
const Data = require('../data/Data.js');

module.exports = {
    name: 'onGuildJoin',
    enabled: true,
    run: async (client) => {
        client.on('guildCreate', async (guild) => {
            if(!guild.available) return;

            if(!Data.getGuild(guild.id)) {
                Data.addGuild(guild.id);
            }
        });
    }
};