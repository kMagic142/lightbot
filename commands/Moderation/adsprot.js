const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args) => {

  // perms checking
  if(!message.member.hasPermission('MANAGE_GUILD')) {
    message.channel.send(`${client.language["adsprot"].noPermission}`);
    return;
  };

  // reading json file
  const thing = JSON.parse(fs.readFileSync(client.adsprotFile, 'utf8'));

  // if args is on

  if(args[0] === "on") {

    // if already on
    if(thing[message.guild.id]) {
      let alreadyOnMessage = client.language["adsprot"].alreadyOn;
      const alreadyOn = alreadyOnMessage.replace("${prefix}", client.prefixes[message.guild.id].prefixes);

      message.channel.send(`${alreadyOn}`);
      return;
    }

    // if not already on
    thing[message.guild.id] = "on";
    fs.writeFile(client.adsprotFile, JSON.stringify(thing, null, 2), (err) => {
      if (err) throw err;
    })
    message.channel.send(`${client.language["adsprot"].turnedOn}`);

      // if args = off
    } else if(args[0] === "off") {

      // if already off
      if(!thing[message.guild.id]) {
        let alreadyOffMessage = client.language["adsprot"].alreadyOff;
        const alreadyOff = alreadyOffMessage.replace("${prefix}", client.prefixes[message.guild.id].prefixes);

        message.channel.send(`${alreadyOff}`);
        return;
      }

      //if not already off
      message.channel.send(`${client.language["adsprot"].turnedOff}`);
      delete thing[message.guild.id];
      fs.writeFile(client.adsprotFile, JSON.stringify(thing, null, 2), (err) => {
        if (err) throw err;
      })

    } else if(args[0] !== "off" || args[0] !== "on") {
      let incorrectUsageMessage = client.language["adsprot"].incorrectUsage;
      const incorrectUsage = incorrectUsageMessage.replace("${prefix}", client.prefixes[message.guild.id].prefixes);

      message.channel.send(`${incorrectUsage}`);
      return;
    }
};

module.exports.help = {
  name: 'adsprot'
}
