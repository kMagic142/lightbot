const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args) => {

  const talkedRecently = new Set();

  if (talkedRecently.has(message.author.id)) {
            message.channel.send(":x: | **Wait 1 minute before changing the prefix again.**");
    } else {
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 60000);
    }

  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${client.language["setprefix"].noPermission}`);

  if(args[0] === "[" || args[0] === "{" || args[0] === "]" || args[0] === "}" || args[0] === ":") {
    message.channel.send(`${client.language["setprefix"].blacklistedPrefix}`);
    return;
  }

  if(!args[0]) return message.channel.send(`${client.language["setprefix"].incorrectUsage}`)

  client.prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile(client.prefixesFile, JSON.stringify(client.prefixes, null, 2), (err) => {
    if (err) console.log(err)
  });

  let prefixSetMessage = client.language["setprefix"].prefixSet;
  const prefixSet = prefixSetMessage.replace("${prefix}", args[0]);

  message.channel.send(`${prefixSet}`);
};

module.exports.help = {
  name: 'setprefix'
}
