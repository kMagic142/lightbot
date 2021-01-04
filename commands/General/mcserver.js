const Discord = require('discord.js');
const mcserver = require('mc-hermes');

module.exports.run = async (client, message, args) => {

  mcserver.pc({ server: args.join(" ") })
    .then((data)=>{

      let EmbedTitleMessage = client.language["mcserver"].embedTitle;
      const EmbedTitle = EmbedTitleMessage.replace("${server}", args.join(" "));

    	const embed = new Discord.MessageEmbed()
    	.setAuthor(client.user.username, client.user.avatarURL())
    	.setTitle(`${EmbedTitle}`)
    	.addField(`${client.language["mcserver"].version}`, data.version.name)
    	.addField(`${client.language["mcserver"].players}`, `${data.players.online}/${data.players.max}`)
      .setImage(`https://mcapi.us/server/image?ip=${args.join(" ")}&theme=dark`)
    	.setColor(client.color)
    	.setTimestamp()

      if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
        message.channel.send(`${client.language["mcserver"].noEmbedPermission}`);
        return;
      };

    	message.channel.send({embed: embed});
    });
};

module.exports.help = {
  name: 'mcserver'
}
