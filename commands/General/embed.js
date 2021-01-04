const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args) => {

  var argresult = message.content.substring(1).split("!");
  if(argresult[1] === undefined || argresult[2] === undefined) {

    let noArgumentsMessage = client.language["embed"].noArguments;
    const noArguments = noArgumentsMessage.replace("${prefix}", client.prefixes[message.guild.id].prefixes);

    message.channel.send(`${noArguments}`);
    return;

  };
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${argresult[1].slice(2)}`, client.user.avatarURL())
    .setDescription(`${argresult[2]}`)
    .setThumbnail(client.user.avatarURL())
    .setFooter(`This guild's prefix is ${client.prefixes[message.guild.id].prefixes} || Developed by kMagic`)
    .setColor(client.color)

    message.channel.send(embed);
};

module.exports.help = {
  name: 'embed'
}
