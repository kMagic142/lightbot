const utils = require('../../../utils/Utils');
const Giveaway = require('../../../handlers/handleGiveaway');

module.exports = {
    enabled: true,
    name: 'giveaway start',
    aliases: 'gstart',
    description: 'Start a giveaway with no interactive setup.',
    expectedArgs: '<Channel> <Time> <Winners> <Prize>',
    minArgs: 4,
    maxArgs: 5,
    permissions: ['MANAGE_GUILD'],
    requiredRoles: [],
    run: async (message, args) => {
        let client = message.client;
        var channel = message.channel;


        var gchannel;
        var time;
        var winners;
        var prize;
        
        gchannel = message.mentions.channels.first();

        try 
        {
            gchannel = message.guild.channels.cache.get(gchannel.id);
            if(!gchannel) throw TypeError();
        }
        catch(e) 
        {
            gchannel = message.guild.channels.cache.find(c => c.name === args[0] || c.id === args[0]);
             if(!gchannel) 
                return channel.send(client.language.giveaway.invalidChannel());
        }


        time = args[1];
        time = await utils.parseTime(time);

        if(time < 5) 
            return channel.send(client.language.giveaway.invalidTime());

        winners = parseInt(args[2]);

        if(typeof winners !== "number" || winners <= 0) 
            return channel.send(client.language.giveaway.invalidWinners());

        prize = args[3];

        if(prize.length > 250) 
            return channel.send(client.language.giveaway.invalidPrize());

        await channel.send(client.language.giveaway.setup.success(prize, message));
        await Giveaway(gchannel, time, winners, prize, message.author, client);

    }
};