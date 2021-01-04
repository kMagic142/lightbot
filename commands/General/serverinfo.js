const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (client, message, args) => {
  if(!message.guild.available) {
    return;
  }
     let i = 0;
     message.guild.members.cache.map(member => {
       if(!member.user.bot) i++;
     });

     let b = 0;
     message.guild.members.cache.map(member => {
       if(member.user.bot) b++;
     });

     let o = 0;
     message.guild.members.cache.map(member => {
       if(member.user.presence.status === 'online' || member.user.presence.status === 'away' || member.user.presence.status === 'dnd') o++;
     });

     let text = 0;
     message.guild.channels.cache.map(channel => {
       if(channel.type === "text") text++;
     });

     let voice = 0;
     message.guild.channels.cache.map(channel => {
       if(channel.type === "voice") voice++;
     });

     let chan = 0;
     message.guild.channels.cache.map(channel => {
       if(channel.type === "voice" || channel.type === "text") chan++;
     });

     let cat = 0;
     message.guild.channels.cache.map(channel => {
       if(channel.type === "category") cat++;
     });

     const guildIcon = "https://cdn.discordapp.com/icons/" + message.guild.id + "/" + message.guild.icon + ".webp" || "http://www.royallepagesudbury.ca/images/no-image.png";

     const humanLevels = {
       "NONE": 'None',
       "LOW": 'Low',
       "MEDIUM": 'Medium',
       "HIGH": '(╯°□°）╯︵ ┻━┻',
       "VERY_HIGH": '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
     };
     
    const embed = new Discord.MessageEmbed()
    .setColor(client.color)
    .setAuthor(message.guild.name, guildIcon)
    .setThumbnail(guildIcon)
    .addField("Members", `Humans: ${i}\nRobots: ${b}\nOnline: ${o}\nTotal: ${message.guild.members.cache.size}`, true)
    .addField("Owner", `Tag: ${message.guild.owner.user.tag}\nID: ${message.guild.owner.user.id}\nWhat they're playing: ${message.guild.owner.user.presence.game ? message.guild.owner.user.presence.game.name : 'None'}\nStatus: ${message.guild.owner.user.presence.status}`, true)
    .addField("Channels", chan, true)
    .addField("Voice Channels", voice, true)
    .addField("Text Channels", text, true)
    .addField("Categories", cat, true)
    .addField(`Region`, `${message.guild.region}`, true)
    .addField("Roles", message.guild.roles.cache.size, true)
    .addField(`Created at:`, `${moment.utc(message.guild.createdAt).format('LLLL')}`, true)
    .addField(`Member Verification Level:`, `${humanLevels[message.guild.verificationLevel]}`, true)
    .setTimestamp()
    .setFooter("ID: " + message.guild.id, guildIcon)

    if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
      message.channel.send(":x: **| I need the `EMBED_LINKS` permission to this command to work.**");
      return;
    };

    message.channel.send({embed: embed})
};

module.exports.help = {
  name: 'serverinfo'
}
