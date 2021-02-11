const { MessageEmbed } = require('discord.js');
const Data = require('../../../data/Data');

module.exports = {
    enabled: true,
    name: 'invite rewards',
    aliases: ['inv rewards'],
    description: 'Display invite rewards in this guild.',
    minArgs: 0,
    maxArgs: null,
    permissions: [],
    requiredRoles: [],
    run: async (message) => {
        let client = message.client;

        let data = await Data.getInviteRewards(message.guild.id);

        if(!data.enabled)
            return message.channek.send(client.language.invites.rewardsDisabled());

        if(data.rewards < 1)
            return message.channek.send(client.language.invites.rewardsDisabled());

        const embed = new MessageEmbed()
        .setAuthor("Invite rewards for this guild", message.guild.iconURL())
        .setDescription("Rewards for this guild are the following")
        .setColor(client.embedColor);

        for(let reward of data.rewards) 
        {
            embed.addField(`▫️ ${reward.uses} invite uses`, `Reward: ${reward.reward}`);
        }

        return message.channel.send(embed);
    }
};