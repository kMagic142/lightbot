const Discord = require('discord.js');
const meme = require('memejs');

module.exports.run = async (client, message, args) => {

  meme.memeAsync(function(data) {
  const embed = new Discord.MessageEmbed()
  .setTitle(data.title[0])
  .setColor(client.color)
  .setImage(data.url[0])

  if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
    message.channel.send(`${client.language["meme"].noEmbedPermission}`);
    return;
  }

  message.channel.send(embed);
})};

module.exports.help = {
  name: "meme"
};
