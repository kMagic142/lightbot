
require('dotenv').config();
const Discord = require('discord.js');
const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const registerCommand = require('./events/handleCommand.js');


const client = new Discord.Client({fetchAllMembers: true});
const config = require("./Storage/config.json");
const prefixgen = config.prefix;
const token = process.env.TOKEN;
const version = config.version;
const logging = config.logging;
const embedColor = config.color;
var langFile = config.lang;


client.commands = [];

async function getFiles(dir) {
  const readdir = promisify(fs.readdir);
  const stat = promisify(fs.stat);
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

async function registerCmds() {
  await getFiles("./commands")
  .then(files => {
      files.forEach((f) =>{
          let props = require(f);
          client.commands.push(props);
      });
  });

  if(client.commands.length <= 0) {
      console.log(new Error("[Hyper] An error occurred! Please contact the developer on Discord or MC-Market and tell them this error code: 153215"));
      return process.exit(1);
  };

  for(const command of client.commands) {
    registerCommand(client, command);
  }
}

async function registerDataFiles() {
  await getFiles("./Storage")
  .then(files => {
    files.forEach((f) => {
      switch (f.split("\\").pop()) {
        case "ads.json":
          client.adsFile = require(f);
          break;
        case "config.json":
          client.configFile = require(f);
          break;
        case "prefixes.json":
          client.prefixesFile = require(f);
          break;
        case "welcome.json":
          client.welcomeFile = require(f);
          break;
      }
    });
  });
}


if (process.version.slice(1).split('.')[0] < 8) {
  console.log(new Error(`[Hyper] You must have NodeJS 8 or higher installed on your PC.`));
  process.exit(1);
};

if (logging !== true && logging !== false) {
  console.log(new TypeError(`[Hyper] The 'logging' value must be true or false. Logging is set to false by default. Error code: 159254`));
  logging = false;
};

if (logging === true) {
  console.log(`[Hyper] Logging enabled! When someone will execute a command, I will log that in here.`);
};


client.login(token);


// client ready event
client.on('ready', async () => {
  // set value for embed colors
  client.embedColor = embedColor;

  // sets value for language preffered, and checks the language
  client.language = require(`./messages/messages_${langFile}.json`);

    switch(langFile) {
      case "en-US":
        console.log(`${langFile}`);
        break;
      case "RO":
        console.log(`${langFile}`);
        break;
      default:
        console.log(new TypeError(`[Hyper] The 'lang' value must be en_US or RO. Error code: 159275\nEnglish was set for now to avoid closing the process, but please fix the problem asap.`));
        langFile = "en-US";
        client.language = require(`./messages/messages_${langFile}.json`);
        console.log(`${langFile}`);
    }

    // register data files
    await registerDataFiles();

    // register all cmds
    await registerCmds();

    // console logs
    console.log("\n\n\n\n\n \x1b[36m██░ ██▓██   ██▓ ██▓███  ▓█████  ██▀███      ▄▄▄▄    ▒█████  ▄▄▄█████▓\n\x1b[36m▓██░ ██▒▒██  ██▒▓██░  ██▒▓█   ▀ ▓██ ▒ ██▒   ▓█████▄ ▒██▒  ██▒▓  ██▒ ▓▒\n\x1b[36m▒██▀▀██░ ▒██ ██░▓██░ ██▓▒▒███   ▓██ ░▄█ ▒   ▒██▒ ▄██▒██░  ██▒▒ ▓██░ ▒░\n\x1b[36m░▓█ ░██  ░ ▐██▓░▒██▄█▓▒ ▒▒▓█  ▄ ▒██▀▀█▄     ▒██░█▀  ▒██   ██░░ ▓██▓ ░ \n\x1b[36m░▓█▒░██▓ ░ ██▒▓░▒██▒ ░  ░░▒████▒░██▓ ▒██▒   ░▓█  ▀█▓░ ████▓▒░  ▒██▒ ░ \n\x1b[36m ▒ ░░▒░▒  ██▒▒▒ ▒▓▒░ ░  ░░░ ▒░ ░░ ▒▓ ░▒▓░   ░▒▓███▀▒░ ▒░▒░▒░   ▒ ░░   \n\x1b[36m ▒ ░▒░ ░▓██ ░▒░ ░▒ ░      ░ ░  ░  ░▒ ░\n\x1b[36m ▒░   ▒░▒   ░   ░ ▒ ▒░     ░    \n\x1b[36m ░  ░░ ░▒ ▒ ░░  ░░          ░     ░░   ░     ░    ░ ░ ░ ░ ▒    ░      \n\x1b[36m ░  ░  ░░ ░                 ░  ░   ░         ░          ░ ░           \n\x1b[36m        ░ ░                                       ░                   \x1b[0m")
    console.log(`\n \n \n \nSuccessfully connected into Discord's API v8\nScanning for guilds...\n\x1b[36m[-]\x1b[0m ${client.guilds.cache.map(n => n.name + ` (ID: \x1b[36m${n.id}\x1b[0m)`).join(`\x1b[36m\n[-]\x1b[0m `)}`);
    console.log(`Scan completed!\n\nVersion: ${version}\nAll commands are loaded. We are ready to go!\nInvite link: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8\nType ${prefixgen}help to get a list of commands to use!`);

    // activity
    client.user.setActivity(`Hyper BOT v${version} - ${prefixgen}help`, { type: 'LISTENING' });

});