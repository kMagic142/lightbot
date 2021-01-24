
require('dotenv').config();
const Discord = require('discord.js');
const { readdir } = require('fs').promises;
const { resolve, parse } = require('path');
const handleEvents = require('./handlers/handleEvents.js');

const client = new Discord.Client({fetchAllMembers: true});
client.config = require("./Storage/config.json");
const token = process.env.TOKEN;
let logging = client.config.logging;

client.commands = [];
client.events = [];
client.guildData = new Discord.Collection();
client.userData = new Discord.Collection();
//client.expData = new Discord.Collection();


async function registerEvents() {
  await client.getFiles("./events")
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


client.getFiles = async (dir) => {
  const subdirs = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(subdirs.map((subdir) => {
      const res = resolve(dir, subdir.name);
      return subdir.isDirectory() ? client.getFiles(res) : res;
  }));
  return Array.from(new Set(files.flat()));
};

client.getDirectories = async (dir) => {
  const subdirs = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(subdirs.map((subdir) => {
      const res = resolve(dir, subdir.name);
      return subdir.isDirectory() ? client.getDirectories(res) : parse(res).dir;
  }));
  return Array.from(new Set(files.flat()));
};


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

client.setMaxListeners(20);

module.exports.client = client;