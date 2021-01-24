const registerCommand = require('../handlers/handleCommand');
const Data = require("../data/Data");

module.exports = {
    name: 'onMessage',
    enabled: true,
    run: async (client) => {
        client.on('message', async (message) => {
            if(message.author.bot) return;
            if(message.channel.type === "dm") return;
            
            if(await Data.getExpEnabled(message.guild.id)) {
                let exp = await Data.getExperience(message.author.id);
                exp += 1;
                client.userData.set(message.author.id, { experience: exp });
            }
        });
    }

};