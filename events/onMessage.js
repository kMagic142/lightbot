const Data = require("../data/Data");

module.exports = {
    name: 'onMessage',
    enabled: true,
    run: async (client) => {
        client.on('message', async (message) => {
            if(message.author.bot) return;
            if(!message.guild) return;

            if(await Data.getFilterEnabled(message.guild.id)) {
                let words = await Data.getFilters(message.guild.id);
                for(const word of words) {
                    if(message.content.includes(word)) {
                        message.delete();
                        break;
                    }
                }
            }
            
            if(await Data.getExpEnabled(message.guild.id)) {
                let data = client.userData.get(message.author.id);
                data.experience += 1;
                let level = Math.floor(25 + (Math.sqrt(625 + 100 * data.experience))) / 50;
                data.level = level;

                let nextExp = 25 * level * (1 + level);

                
                if(data.level < Math.floor(level)) {
                    message.channel.send(client.language.experience.levelUp(message.author, level, nextExp));
                }

                return client.userData.set(message.author.id, data);
            }
        });
    }

};