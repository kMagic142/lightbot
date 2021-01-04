const Discord = require('discord.js');

module.exports.run = async (client, message, _args) => {

  let pingMessage = client.language["ping"].ping;
  const ping = pingMessage.replace("${ping}", Math.round(client.ws.ping));

  message.channel.send(`${ping}`);
};

module.exports.help = {
  name: 'ping'
}
