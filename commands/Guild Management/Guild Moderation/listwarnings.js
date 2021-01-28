const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    enabled: true,
    name: 'listwarnings',
    aliases: ['listwarns'],
    description: 'See a guild member\'s warnings.',
    expectedArgs: '<@Member>',
    minArgs: 1,
    maxArgs: 2,
    permissions: ['MANAGE_MESSAGES'],
    requiredRoles: [],
    run: async (message) => {
        const client = message.client;
        var user = message.mentions.members.first().user || null;

        if(!user) message.channel.send(client.language.warn.invalidUser());
        let data = client.userData.get(user.id).warnings.filter(w => w.guild === message.guild.id);

        let description = "";
        for(const warn of data) {
            let timestamp = warn.timestamp;

            description += `\nWarned at date: ${moment(timestamp).format("LLLL")}\nWarn ID: ${warn.id}\nReason: ${warn.reason}\n`;
        }

        if(description.length < 1)
        return message.channel.send(client.language.warn.noWarns());

        const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setAuthor(`Showing warnings for ${user.username}`, user.avatarURL())
        .setDescription(description);

        message.channel.send(embed);
    }
};