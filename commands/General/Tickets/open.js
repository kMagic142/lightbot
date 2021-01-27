const Data = require('../../../data/Data');

module.exports = {
    enabled: true,
    name: 'ticket open',
    aliases: ['topen'],
    description: 'Open a new ticket.',
    minArgs: 0,
    maxArgs: null,
    permissions: [],
    requiredRoles: [],
    run: async (message) => {
        var client = message.client;
        let guild = message.guild;

        let data = Data.getTickets(guild.id) || null;

        if(!data.enabled) return;

        let category = message.guild.channels.resolve(data.ticketCategory) || null;

        if(!category) {
            return message.channel.send(client.language.tickets.open.noCategory());
        }

        category.children.forEach((channel) => {
            if(channel.name.includes(message.author.id)) {
                if(!data.denyMultipleTickets) {
                    return message.channel.send(client.language.tickets.open.denyMultipleTickets());
                }
            }
        });

        message.delete();

        var channelName = `ticket-${message.author.id}`;

        await message.guild.channels.create(channelName, {
            type: 'text',
            topic: `Ticket created by ${message.author.tag}`,
            parent: category
        })
        .then(async channel => {
            await channel.lockPermissions();
            await channel.updateOverwrite(message.author.id,
                {
                    VIEW_CHANNEL: true, 
                    SEND_MESSAGES: true, 
                    ATTACH_FILES:true
                }
            );

            return await channel.send(client.language.tickets.open.ticketOpened(channel, client, message.author));
        });
        
    }
};