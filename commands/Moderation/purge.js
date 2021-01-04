const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

  const argresult = args.join(' ');
  if(!argresult) return;
  if(isNaN(argresult)) {
    message.channel.send(`${client.language["purge"].invalidNumber}`);
    return;
  }
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send(`${client.language["purge"].noPermission}`);
      return;
    }
    let messagecount = parseInt(args.join(" "));
    message.channel.bulkDelete(messagecount)
    .then(() => {
      setTimeout(() => {
        let purgedMessage = client.language["purge"].purged;
        const purged = purgedMessage.replace("${messages}", messagecount);

        message.channel.send(`${purged}`)
        .then(m => {
          setTimeout(() => {
            m.delete()
          }, 5000);
        });
      }, 2000);
    });
};

module.exports.help = {
  name: 'purge'
}
