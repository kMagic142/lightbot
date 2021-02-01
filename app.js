require('dotenv').config();
const Discord = require('discord.js');
const handleEvents = require('./handlers/handleEvents.js');
const utils = require('./utils/Utils');

const client = new Discord.Client({fetchAllMembers: true});
client.config = require("./Storage/config.json");
const token = process.env.TOKEN;
let logging = client.config.logging;

client.commands = [];
client.events = [];
client.guildData = new Discord.Collection();
client.userData = new Discord.Collection();
client.giveaways = new Discord.Collection();


async function registerEvents() {
  await utils.getFiles("./events")
  .then(files => {
      files.forEach((f) => {
          let event = require(f);
          client.events.push(event);
      });
  });

  if(client.events.length <= 0) {
      console.log(new Error("[Light] An error occured! No events are being registered. Please issue a ticket."));
      return process.exit(1);
  }

  for(const event of client.events) {
      handleEvents(client, event);
  }
}


if (process.version.slice(1).split('.')[0] < 14) {
  console.log(new Error(`[Light] You must have Node.js v14 or higher installed on your PC.`));
  process.exit(1);
}

if (logging !== true && logging !== false) {
  console.log(new TypeError(`[Light] The 'logging' value must be true or false. Logging is set to false by default.`));
  logging = false;
}


client.login(token);

registerEvents();

client.setMaxListeners(30);

module.exports.client = client;