const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args) => {

  // perms checking
  if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
    message.channel.send(`${client.language["dogs"].noEmbedPermission}`);
    return;
  }

  snekfetch.get('http://random.dog/woof.json').then(body => {

  // embed
  const embed = new Discord.MessageEmbed()
  .setImage(body.body.url)
  .setColor(client.color)
  .setFooter(`${client.language["dogs"].cuteMessage}`, message.author.avatarURL)
  message.channel.send(embed);
});
};

module.exports.help = {
  name: 'dogs'
}
