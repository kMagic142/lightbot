const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args) => {

  // user getting
  const user = message.mentions.users.first() || message.author;

  // perms checking
  if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
    message.channel.send(`${client.language["avatar"].noEmbedPermission}`);
    return;
  }
  
  // message sending
  let showingAvatarMessage = client.language["avatar"].showingAvatar;
  const showingAvatar = showingAvatarMessage.replace("${user}",user.username);

   	message.channel.send(`${showingAvatar}`).then(() => {
			setTimeout(() => {
        // embed
        let requestedByMessage = client.language["avatar"].requestedBy;
        const requestedBy = requestedByMessage.replace("${author}", message.author.username);

				const embed = new Discord.MessageEmbed()
				.setAuthor(`${user.username}`, user.avatarURL())
				.setDescription("Avatar ID: " + user.avatar)
				.setImage(user.avatarURL())
				.setFooter(`${requestedBy}`, message.author.avatarURL())
        .setTimestamp()
				.setColor(client.color)

        // embed sending
			message.channel.send({embed: embed});
		}, 100);
	 });
};

module.exports.help = {
  name: 'avatar'
}
