const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (client, message, args) => {
     const user = message.mentions.users.first() || message.author;
     const member = message.mentions.members.first() || message.member;
          const embed = new Discord.MessageEmbed()
          .setAuthor(user.tag, user.avatarURL())
          .setDescription("ID: " + user.id)
          .addField('Nickname', member.nickname ? member.nickname : 'None', true)
          .addField("Username", user.username, true)
          .addField('Registered', `${moment(user.createdAt).format("LLLL")}`, true)
          .addField('Is a bot?', user.bot ? 'Yes' : 'No', true)
          .addField('Status', user.presence.status, true)
          .addField('Game', user.presence.activities[0] ? user.presence.activities[0].name : 'None', true)
          .addField("Joined", `${moment(member.joinedAt).format("LLLL")}`, true)
          .addField("Roles [" + member.roles.cache.size + "]", member.roles.cache.map(r => r.name).join(', '), true)
          .setThumbnail(user.avatarURL())
          .setColor(client.color);

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(":x: **| I need the `EMBED_LINKS` permission to this command to work.**");
            return;
          };

          message.channel.send(embed);
};

module.exports.help = {
  name: 'userinfo'
}
