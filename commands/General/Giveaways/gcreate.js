const utils = require('../../../utils/Utils');
const Giveaway = require('../../../handlers/handleGiveaway');

module.exports = {
    enabled: true,
    name: 'giveaway create',
    aliases: ['gcreate'],
    description: 'Create a giveaway',
    minArgs: 0,
    maxArgs: null,
    permissions: ['MANAGE_GUILD'],
    requiredRoles: [],
    run: async (message) => {
        var client = message.client;
        var channel = message.channel;

        let filter = (m) => m.author.id === message.author.id;

        var gchannel;
        var time;
        var winners;
        var prize;

        channel.send(client.language.giveaway.setup.first());
        
        for (const f of [waitChannel, waitTime, waitWinners, waitPrize]) {
            await f();
        }
        
        
        async function waitChannel() {
            return channel.awaitMessages(filter, { max: 1, time: 60000 })
            .then(m => {
                m = m.first();
                if(m.content === 'cancel') return channel.send(client.language.giveaway.canceled());

                var content = m.mentions.channels.first();

                try {
                    gchannel = message.guild.channels.cache.get(content.id);
                    if(!gchannel) throw TypeError();
                } catch(e) {
                    gchannel = message.guild.channels.cache.find(c => c.name === m.content || c.id === m.content);
                    if(!gchannel) {
                        channel.send(client.language.giveaway.invalidChannel());
                        return waitChannel();
                    }
                }

                channel.send(client.language.giveaway.setup.second(gchannel, message));
            });
        }

        async function waitTime() {
            return channel.awaitMessages(filter, { max: 1, time: 60000 })
            .then(async m => {
                m = m.first();
                if(m.content === 'cancel') return channel.send(client.language.giveaway.canceled());

                time = m.content;
                time = await utils.parseTime(time);

                if(time < 5) {
                    channel.send(client.language.giveaway.invalidTime());
                    return waitTime();
                }

                channel.send(client.language.giveaway.setup.third(time, message));
            });
        }

        async function waitWinners() {
            return channel.awaitMessages(filter, { max: 1, time: 60000 })
            .then(m => {
                m = m.first();
                if(m.content === 'cancel') return channel.send(client.language.giveaway.canceled());

                winners = parseInt(m.content);

                if(typeof winners !== "number" || winners <= 0) {
                    channel.send(client.language.giveaway.invalidWinners());
                    return waitWinners();
                }

                channel.send(client.language.giveaway.setup.forth(time, message));
            });
        }

        async function waitPrize() {
            return channel.awaitMessages(filter, { max: 1, time: 60000 })
            .then(async m => {
                m = m.first();
                if(m.content === 'cancel') return channel.send(client.language.giveaway.canceled());

                prize = m.content;

                if(prize.length > 250) {
                    channel.send(client.language.giveaway.invalidPrize());
                    return waitPrize();
                }

                await channel.send(client.language.giveaway.setup.success(prize, message));
                await Giveaway(gchannel, time, winners, prize, message.author, client);
            });  
        }

    }
};