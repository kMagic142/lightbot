const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args) => {

  fs.readFileSync(client.prefixesFile, "utf8");

  setTimeout(() => {

    switch(args[0]) {
      case "8ball":
        const ballHelp = new Discord.MessageEmbed()
          .setAuthor("8ball command", client.user.avatarURL)
          .setDescription("question the mighty 8Ball!")
          .addField("Usage", `${client.prefix}8ball <question>`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: ballHelp});
            return;
          };

        message.channel.send({embed: ballHelp});
        break;

      case "adsprot":
        const adsprotHelp = new Discord.MessageEmbed()
          .setAuthor("adsprot command", client.user.avatarURL)
          .setDescription("activates ads protection")
          .addField("Usage", `${client.prefix}adsprot <on/off>`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: adsprotHelp});
            return;
          };

        message.channel.send({embed: adsprotHelp})
        break;

      case "avatar":
        const avatarHelp = new Discord.MessageEmbed()
          .setAuthor("avatar command", client.user.avatarURL)
          .setDescription("displays the mentioned user's avatar")
          .addField("Usage", `${client.prefix}avatar [<@user>]`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: avatarHelp});
            return;
          };

        message.channel.send({embed: avatarHelp})

        break;
      case "ban":
        const banHelp = new Discord.MessageEmbed()
          .setAuthor("ban command", client.user.avatarURL)
          .setDescription("ban the mentioned user")
          .addField("Usage", `${client.prefix}ban <@user>`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: banHelp});
            return;
          };

        message.channel.send({embed: banHelp})
        break;
      case "cats":
        const catsHelp = new Discord.MessageEmbed()
        .setAuthor("cats command", client.user.avatarURL)
        .setDescription("cats!!")
        .addField("Usage", `${client.prefix}cat`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
        .setColor(client.embedColor)

        if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
          message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
          message.author.send({embed: catsHelp});
          return;
        };

        message.channel.send({embed: catsHelp});
        break;
      case "dogs":
        const dogsHelp = new Discord.MessageEmbed()
        .setAuthor("dogs command", client.user.avatarURL)
        .setDescription("dogs!!")
        .addField("Usage", `${client.prefix}dogs`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
        .setColor(client.embedColor)

        if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
          message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
          message.author.send({embed: dogsHelp});
          return;
        };

        message.channel.send({embed: dogsHelp});
        break;
      case "embed":
          const embedHelp = new Discord.MessageEmbed()
          .setAuthor("embed command", client.user.avatarURL)
          .setDescription("generate an embed")
          .addField("Usage", `${client.prefix}embed !<title> !<description>`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: embedHelp});
            return;
          };

          message.channel.send({embed: embedHelp});
          break;
      case "help":
        const helpHelp = new Discord.MessageEmbed()
        .setAuthor("help command", client.user.avatarURL)
        .setDescription("shows up a list of commands")
        .addField("Usage", `${client.prefix}help [<command>]`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
        .setColor(client.embedColor)

        if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
          message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
          message.author.send({embed: helpEmbed});
          return;
        };

        message.channel.send({embed: helpHelp});
        break;
      case "kick":
        const kickHelp = new Discord.MessageEmbed()
          .setAuthor("kick command", client.user.avatarURL)
          .setDescription("kick the mentioned user")
          .addField("Usage", `${client.prefix}kick <@user>`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: kickHelp});
            return;
          };

        message.channel.send({embed: kickHelp});
        break;
      case "lockdown":
        const lockdownHelp = new Discord.MessageEmbed()
          .setAuthor("lockdown command", client.user.avatarURL)
          .setDescription(`lock the channel for a specified amount of time (to unlock do ${client.prefix}lockdown unlock)`)
          .addField("Usage", `${client.prefix}lockdown <time in minutes>`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: lockdownHelp});
            return;
          };

        message.channel.send({embed: lockdownHelp});
        break;
      case "mcserver":
        const mcserverHelp = new Discord.MessageEmbed()
          .setAuthor("mcserver command", client.user.avatarURL)
          .setDescription("displays informations about the specified minecraft server")
          .addField("Usage", `${client.prefix}mcserver <ip or dns>`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: mcserverHelp});
            return;
          };

        message.channel.send({embed: mcserverHelp});
        break;
      case "meme":
        const memeHelp = new Discord.MessageEmbed()
          .setAuthor("meme command", client.user.avatarURL)
          .setDescription("random meme!")
          .addField("Usage", `${client.prefix}meme`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: memeHelp});
            return;
          };

        message.channel.send({embed: memeHelp});
        break;
      case "ping":
        const pingHelp = new Discord.MessageEmbed()
          .setAuthor("ping command", client.user.avatarURL)
          .setDescription("pong!")
          .addField("Usage", `${client.prefix}ping`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: pingHelp});
            return;
          };

        message.channel.send({embed: pingHelp});
        break;
      case "purge":
        const purgeHelp = new Discord.MessageEmbed()
          .setAuthor("purge command", client.user.avatarURL)
          .setDescription("deletes a specified amount of messages")
          .addField("Usage", `${client.prefix}purge <amount of messages>`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: purgeHelp});
            return;
          };

        message.channel.send({embed: purgeHelp});
          break;
        case "say":
          const sayHelp = new Discord.MessageEmbed()
            .setAuthor("say command", client.user.avatarURL)
            .setDescription("make the bot say anything you want!")
            .addField("Usage", `${client.prefix}say <words>`)
            .setThumbnail(client.user.avatarURL)
            .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
            .setColor(client.embedColor)

            if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
              message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
              message.author.send({embed: sayHelp});
              return;
            };

          message.channel.send({embed: sayHelp});
          break;
      case "serverinfo":
        const serverinfoHelp = new Discord.MessageEmbed()
          .setAuthor("serverinfo command", client.user.avatarURL)
          .setDescription("displays informations about the guild")
          .addField("Usage", `${client.prefix}serverinfo`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: serverinfoHelp});
            return;
          };

        message.channel.send({embed: serverinfoHelp});
        break;
      case "setprefix":
        const setPrefixHelp = new Discord.MessageEmbed()
          .setAuthor("setprefix command", client.user.avatarURL)
          .setDescription("set a new guild prefix")
          .addField("Usage", `${client.prefix}setprefix <new prefix>`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: setPrefixHelp});
            return;
          };

        message.channel.send({embed: setPrefixHelp});
        break;
      case "setwelcome":
        const setwelcomeHelp = new Discord.MessageEmbed()
          .setAuthor("setwelcome command", client.user.avatarURL)
          .setDescription("enables welcome messages (detailed setup)")
          .addField("Usage", `${client.prefix}setwelcome`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: setwelcomeHelp});
            return;
          };

        message.channel.send({embed: setwelcomeHelp});
        break;
      case "tempmute":
        const tempmuteHelp = new Discord.MessageEmbed()
          .setAuthor("tempmute command", client.user.avatarURL)
          .setDescription("mutes the mentioned user for a specified amount of time")
          .addField("Usage", `${client.prefix}tempmute <@mention> <time in minutes>`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: tempmuteHelp});
            return;
          };

        message.channel.send({embed: tempmuteHelp});
        break;
      case "unmute":
        const unmuteHelp = new Discord.MessageEmbed()
          .setAuthor("unmute command", client.user.avatarURL)
          .setDescription("unmutes the mentioned user")
          .addField("Usage", `${client.prefix}unmute <@mention>`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: unmuteHelp});
            return;
          };

        message.channel.send({embed: unmuteHelp});
        break;
      case "userinfo":
        const userinfoHelp = new Discord.MessageEmbed()
          .setAuthor("userinfo command", client.user.avatarURL)
          .setDescription("displays informations about the mentioned user")
          .addField("Usage", `${client.prefix}userinfo [<@user>]`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: userinfoHelp});
            return;
          };

        message.channel.send({embed: userinfoHelp});
        break;
      case "website":
        const websiteHelp = new Discord.MessageEmbed()
          .setAuthor("website command", client.user.avatarURL)
          .setDescription("this server's website")
          .addField("Usage", `${client.prefix}website`)
          .setThumbnail(client.user.avatarURL)
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

          if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
            message.author.send({embed: websiteHelp });
            return;
          };

        message.channel.send({embed: websiteHelp});
        break;

      default:
        const helpEmbed = new Discord.MessageEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setDescription("Hey, I'm [**__Hyper__**](https://www.mc-market.org/resources/7377/)! A bot that can do a lot of things!\nLike give you informations about how many humans do you have in your discord server, or how many players a minecraft server has online!")
          .addField("\🔨 Moderation commands", `__${client.prefix}ban @mention__ - ban the mentioned user\n__${client.prefix}kick @mention__ - kick the mentioned user\n__${client.prefix}unmute @mention__ - unmutes the mentioned user\n__${client.prefix}tempmute @mention <time in minutes>__ - mutes the mentioned user for a specified amount of time\n__${client.prefix}purge <amount of messages>__ - deletes a specified amount of messages`)
          .addField("\:gear: Administration commands", `__${client.prefix}lockdown <time in minutes>__ - lock the channel for a specified amount of time (to unlock do __${client.prefix}lockdown unlock__)\n__${client.prefix}setprefix <new prefix>__ - set a new guild prefix\n__${client.prefix}adsprot <on/off>__ - activates ads protection\n__${client.prefix}setwelcome__ - enables welcome messages (detailed setup)`, true)
          .addField("\📃 Informative commands", `__${client.prefix}avatar @mention__ - displays the mentioned user's avatar\n__${client.prefix}ping__ - pong!\n__${client.prefix}mcserver <ip or DNS>__ - displays informations about the specified minecraft server\n__${client.prefix}userinfo @mention__ - displays informations about the mentioned user\n__${client.prefix}serverinfo__ - displays informations about the guild\n__${client.prefix}website__ - this server's website`, true)
          .addField("\:red_car: Fun commands", `__${client.prefix}cats__ - cats!!\n__${client.prefix}dogs__ - dogs!!\n__${client.prefix}8ball <question>__ - question the mighty 8Ball!\n__${client.prefix}meme__ - random meme!\n__${client.prefix}embed !<title> !<description>__ - generate an embed\n__${client.prefix}say <words>__ -make the bot say anything you want!`, true)
          .setTimestamp()
          .setFooter(`This guild's prefix is ${client.prefix} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
          .setColor(client.embedColor)

        if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
          message.channel.send(`:white_check_mark: **| Check your DMs. :ok_hand:**`);
          message.author.send({embed: helpEmbed});
          return;
        };

        message.channel.send({embed: helpEmbed});
        break;
    }
  }, 1000);
}

module.exports.help = {
    name: "help"
}
