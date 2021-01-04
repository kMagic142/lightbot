const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args) => {

  // perms checking
  if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
    message.channel.send(`${client.language["cats"].noEmbedPermission}`);
    return;
  }

  snekfetch.get('http://aws.random.cat/meow').then(body => {

  // embed
  const embed = new Discord.MessageEmbed()
  .setImage(body.body.file)
  .setColor(client.color)
  .setFooter(`${client.language["cats"].cuteMessage}`, message.author.avatarURL)
  message.channel.send(embed);
});
};

module.exports.help = {
  name: 'cats'
}
