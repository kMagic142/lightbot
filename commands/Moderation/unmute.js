const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {


  if (message.mentions.users.size < 1) {
    message.channel.send(`${client.language["unmute"].noMention}`);
    return;
  }

  if (message.mentions.members.size < 1) {
    message.channel.send(`${client.language["unmute"].noMention}`);
    return;
  }

      let user = message.mentions.users.first();
      let member = message.mentions.members.first();
      if(!message.member.hasPermission('MANAGE_GUILD')) {
        message.channel.send(`${client.language["unmute"].noPermission}`);
        return;
      }

      const mutedRole = message.guild.roles.find('name', "Muted");

      if(!mutedRole) {
      	message.channel.send(`${client.language["unmute"].noMutedRole}`);
      }

      if(message.member.roles.has(mutedRole.id)) {
      	member.removeRole(mutedRole.id).then(() => {
          setTimeout(() => {

            let unmutedMessage = client.language["unmute"].unmuted;
            const unmuted = unmutedMessage.replace("${user}", user.tag);

            message.channel.send(`${unmuted}`);
      	}, 1000)
      });
    } else {
      message.channel.send(`${client.language["unmute"].noRoleAsigned}`);
      return;
    }
};

module.exports.help = {
  name: 'unmute'
}
