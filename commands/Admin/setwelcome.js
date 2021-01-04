const Discord = require('discord.js');
const fs = require('fs');
let prefixes = JSON.parse(fs.readFileSync("./Storage/prefixes.json", "utf8"));

module.exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${client.language["setwelcome"].noPermission}`);

  message.channel.send(`${client.language["setwelcome"].step1}`)
  .then(() => {
    message.channel.awaitMessages(response => response.author.id === message.author.id, {
      max: 1,
      time: 30000,
      errors: ['time'],
    })

    .then((collected) => {
      if(collected.first().content === "cancel") {
        message.channel.send(`${client.language["setwelcome"].canceled}`);
        return;
      }

      const wchan = message.guild.channels.find('name', collected.first().content);
      if(!wchan || wchan === undefined) {
        message.channel.send(`${client.language["setwelcome"].invalidChannel}`);
        return;
      }

      if(wchan.type === "voice" || wchan.type === "category") {
        message.channel.send(`${client.language["setwelcome"].invalidTextChannel}`);
        return;
      }

      if(!wchan.permissionsFor(message.guild.me).has('SEND_MESSAGES')) {
        message.channel.send(`${client.language["setwelcome"].noMessagePermission}`);
        return;
      }

      const thing = JSON.parse(fs.readFileSync(client.welcomeFile, 'utf8'));

        thing[message.guild.id] = {
          channel: message.guild.channels.find('name', collected.first().content).id
        };

        fs.writeFile(client.welcomeFile, JSON.stringify(thing, null, 2), (err) => {
          if (err) throw err;
        });

        setTimeout(() => {

          const chan = JSON.parse(fs.readFileSync(client.welcomeFile, 'utf8'));

          let step2Message = client.language["setwelcome"].step2;
          let step2 = step2Message.replace("${channel}", chan[message.guild.id].channel);

          message.channel.send(`${step2}`)
          .then(() => {
            message.channel.awaitMessages(response => response.author.id === message.author.id, {
              max: 1,
              time: 30000,
              errors: ['time'],
            })

            .then((collected) => {
              if(collected.first().content === "cancel") {
                message.channel.send(`${client.language["setwelcome"].canceled}`);
                return;
              }

            const thing = JSON.parse(fs.readFileSync(client.welcomeFile, 'utf8'));

            thing[message.guild.id].message = collected.first().content;

            let finishedMessage = client.language["setwelcome"].finished;
            let finishedC = finishedMessage.replace("${channel}", thing[message.guild.id].channel);
            let finished = finishedC.replace("${message}", thing[message.guild.id].message);

            message.channel.send(`${finished}`)

            fs.writeFile(client.welcomeFile, JSON.stringify(thing, null, 2), (err) => {
              if (err) throw err;
            });
          });
        })
        .catch(() => {
          message.channel.send(`${client.language["setwelcome"].canceled}`);
        });
      }, 1000);
    });
  })
  .catch(e => {
    console.log(e);
    message.channel.send("**:x: | Setup canceled.**");
  });
};

module.exports.help = {
    name: "setwelcome"
}
