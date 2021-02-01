module.exports = {
    enabled: true,
    name: 'giveaway reroll',
    aliases: 'greroll',
    description: 'Rerolls the giveaway winners.',
    expectedArgs: '<messageID>',
    minArgs: 1,
    maxArgs: 2,
    permissions: ['MANAGE_GUILD'],
    requiredRoles: [],
    run: (message, args) => {
        let client = message.client;

        let msg;

        try 
        {
            msg = message.channel.messages.cache.get(args[0]);
        } 
        catch (e) 
        {
            if(e) throw e;
            return message.channel.send(client.language.giveaway.noGiveawayInChannel());
        }


        if(msg.author.id !== client.user.id) 
        {
            return message.channel.send(client.language.giveaway.invalidMessageID());
        }


        let data = client.giveaways.get(msg.id);
        let collected = msg.reactions.cache.first().users.cache.array().filter(u => !u.bot);
        let chosenWinners = [];
        let winners = "";

        for(let i = 0; i < data.winners; i++) 
        {
            try 
            {
                chosenWinners.push(collected[Math.floor(Math.random() * collected.length)].id);
            }
            catch (e) 
            {
                return message.channel.send(client.language.giveaway.noUsers());
            }
        }

        chosenWinners.forEach(winner => 
            {
            winners += `<@${winner}>, `;
            }
        );

        if(winners.endsWith(", ")) 
        {
            winners = winners.substring(0, winners.length - 2);
        }


        return data.channel.send(client.language.giveaway.ended(winners));

    }
};