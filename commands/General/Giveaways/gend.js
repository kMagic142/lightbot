module.exports = {
    enabled: true,
    name: 'giveaway end',
    aliases: 'gend',
    description: 'Ends the giveaway in that channel.',
    expectedArgs: '<[messageID]>',
    minArgs: 0,
    maxArgs: 2,
    permissions: ['MANAGE_GUILD'],
    requiredRoles: [],
    run: (message, args) => {
        let client = message.client;

        try 
        {
            let msg = message.channel.messages.cache.find(m => m.reactions.cache.find(r => r.emoji.name === "🎁")) || args[0];

            if(msg.length >= 1) 
            {
                msg = msg.first();
            }

            if(msg.author.id !== client.user.id) 
            {
                return message.channel.send(client.language.giveaway.invalidMessageID());
            }

            clearTimeout(client.giveaways.get(msg.id).timeout);

            return message.channel.send(client.language.giveaway.endedByUser());
        }
        catch (e) 
        {
            return message.channel.send(client.language.giveaway.noGiveawayInChannel());
        }
    }
};