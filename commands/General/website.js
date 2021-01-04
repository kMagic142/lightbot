const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  // replace example.com with your website's URL
  // to disable, delete this file and delete this line from help.js: (use ctrl+f to find it faster)
  //  \n__${prefixes[message.guild.id].prefixes}website__ - this server's website

  message.channel.send(`${client.language["website"].website}`);
};

module.exports.help = {
  name: 'website'
}
