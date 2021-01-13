
require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');
const handleEvents = require('./handlers/handleEvents.js');

const client = new Discord.Client({fetchAllMembers: true});
client.config = require("./Storage/config.json");
const token = process.env.TOKEN;
const logging = client.config.logging;

client.commands = [];
client.events = [];
client.guildData = new Discord.Collection();

let callback = (err) => {
  if(err) throw err;
};


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
};


client.getFiles = async (dir) => {
  const readdir = promisify(fs.readdir);
  const stat = promisify(fs.stat);
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? client.getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

client.registerPrefix = async (id, prefix) => {
  let guild = client.guildData.get(id);

  // check if prefix value already exists
  if(!guild.prefix.length) {
    // create add prefix key and value to json object
    guild.push({
      prefix: prefix
    });

    // turn object into a valid json file
    var file = JSON.stringify(guild, null, 2);

    // set the prefix into the guildData collection
    client.guildData.set(id, guild);

    // write the json file back to its coresponding file
    fs.writeFileSync(`./Storage/guilds/${id}.json`, file, 'utf8', callback);
  } else {
    // set the value to the new prefix
    guild.prefix = prefix;

    // turn object into a valid json file
    var file = JSON.stringify(guild, null, 2);

    // set the prefix into the guildData collection
    client.guildData.set(id, guild);

    // write the json file back to its coresponding file
    fs.writeFileSync(`./Storage/guilds/${id}.json`, file, 'utf8', callback);
  }
}


if (process.version.slice(1).split('.')[0] < 14) {
  console.log(new Error(`[Light] You must have Node.js v14 or higher installed on your PC.`));
  process.exit(1);
};

if (logging !== true && logging !== false) {
  console.log(new TypeError(`[Light] The 'logging' value must be true or false. Logging is set to false by default.`));
  logging = false;
};


client.login(token);

registerEvents();