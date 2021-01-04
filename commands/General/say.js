const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args) => {

  let argresult = args.join(" ");

  // if no args

  if(!args[0]) {

    let noArgumentsMessage = client.language["say"].noArguments;
    const noArguments = noArgumentsMessage.replace("${prefix}", client.prefixes[message.guild.id].prefixes);

    message.channel.send(`${noArguments}`);
    return;

  };

  message.channel.send(`${argresult}`);
};

module.exports.help = {
  name: 'say'
}
