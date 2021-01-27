const Data = require("../data/Data");

module.exports = {
    name: 'onMessage',
    enabled: true,
    run: async (client) => {
        client.on('message', async (message) => {
            if(message.author.bot) return;
            if(!message.guild) return;
            
            if(await Data.getExpEnabled(message.guild.id)) {
                let data = client.userData.get(message.author.id);
                data.experience += 1;
                let level = Math.floor(Math.floor(25 + (Math.sqrt(625 + 100 * data.experience))) / 50);

                let nextExp = 25 * level * (1 + level);

                console.log(data);
                
                if(level > data.level) {
                    data.level = level;
                    message.channel.send(client.language.experience.levelUp(message.author, level, nextExp));
                }

                return client.userData.set(message.author.id, data);
            }
        });
    }

};