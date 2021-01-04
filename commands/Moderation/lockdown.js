const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, args) => {

  if(!args[0]) {
    let incorrectUsageMessage = client.language["lockdown"].incorrectUsage;
    const incorrectUsage = incorrectUsageMessage.replace("${prefix}", client.prefixes[message.guild.id].client.prefixes);

    message.channel.send(`${incorrectUsage}`);
  }
  const time = args[0];
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${client.language["lockdown"].noPermission}`)
  if (!client.lockit) client.lockit = [];
  let validUnlocks = ['release', 'unlock'];

  if(args[0] === "unlock") {
    client.lockit[message.channel.id] = setTimeout(() => {
      message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
      })

      message.channel.send(`${client.language["lockdown"].lockdownDisabled}`);
      delete client.lockit[message.channel.id];
    }, 1000);
    return;
  }

  if(isNaN(time)) {
  	message.channel.send(`${client.language["lockdown"].incorrectArgument}`);
  	return;
  }

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    });

    message.channel.send(`${client.language["lockdown"].lockdownDisabled}`);
    clearTimeout(client.lockit[message.channel.id]);
    delete client.lockit[message.channel.id];
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    });

    let lockdownActivatedMessage = client.language["lockdown"].lockdownActivated;
    let lockdownActivated = lockdownActivatedMessage.replace("${duration}", ms(ms(`${time} minutes`, {long: true}), {long: true}));

    message.channel.send(`${lockdownActivated}`)
      .then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          })

          message.channel.send(`${client.language["lockdown"].lockdownDisabled}`);
          delete client.lockit[message.channel.id];
        }, ms(`${time} minutes`, {long: true}));
      });
    };
};

module.exports.help = {
  name: 'lockdown'
}
