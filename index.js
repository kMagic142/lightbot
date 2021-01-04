/* ########################################################## */
/*                                                            */
/*        HYPER - A multifunctional Discord Bot with          */
/*              moderation, information, utility,             */
/*                fun, and minecraft commands!                */
/*                     Developed by: kMagic                   */
/*  This is my first MCM resource, I really hope you like it. */
/*   If you find any bugs, please consider to DM me on MCM    */
/*                    or DM me on Discord:                    */
/*                    TAG: ♦ kMagic ♦#6276                    */
/*                   ID: 204228790996434944                   */
/*                                                            */
/*       Also, if you need any help, DM me on MC-Market!      */
/*                                                            */
/*                          Enjoy!                            */
/*                                                            */
/* ########################################################## */



/* ########################################################## */
/*                                                            */
/*        REQUIREMENTS (do not modify anything in here)       */
/*                                                            */
/* ########################################################## */


const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const { promisify } = require('util');
const { resolve } = require('path');


/* ########################################################## */
/*                                                            */
/*        VARIABLES (do not modify anything in here)          */
/*                                                            */
/* ########################################################## */


const client = new Discord.Client({
  fetchAllMembers: true
});
const config = require("./Storage/config.json");
const prefixgen = config.prefix;
const version = config.version;
const logging = config.logging;
const embedColor = config.color;
var langFile = config.lang;


/* ########################################################## */
/*                                                            */
/*      COMMAND REGISTERING (do not touch anything in here)   */
/*                                                            */
/* ########################################################## */



client.commands = new Discord.Collection();


const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

async function registerCmds() {
    var jsFiles = [];
    await getFiles("./commands")
      .then(files => {
        files.forEach((f) =>{
          let props = require(f);
          client.commands.set(props.help.name, props);
          jsFiles.push(f.split("\\").pop())
          });
      });

    if(jsFiles.length <= 0) {
      console.log(new Error("[Hyper] An error occurred! Please contact the developer on Discord or MC-Market and tell them this error code: 153215"));
      return process.exit(1);
    };
}

async function registerDataFiles() {
  await getFiles("./Storage")
  .then(files => {
    files.forEach((f) => {
      switch (f.split("\\").pop()) {
        case "ads.json":
          client.adsFile = f;
          break;
        case "config.json":
          client.configFile = f;
          break;
        case "prefixes.json":
          client.prefixesFile = f;
          break;
        case "welcome.json":
          client.welcomeFile = f;
          break;
      }
    });
  });
}



/* ########################################################## */
/*                                                            */
/*        OTHER CHECKS (do not modify anything in here)       */
/*                                                            */
/* ########################################################## */


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


/* ########################################################## */
/*                                                            */
/*      CLIENT LOGING (do not modify anything in here)        */
/*                                                            */
/* ########################################################## */


client.login(config.token);


/* ########################################################## */
/*                                                            */
/*      CLIENT EVENTS (do not modify anything in here)        */
/*                                                            */
/* ########################################################## */

// error notifiers
client.on("error", (e) => {
  console.error(e);
});

client.on("warn", (e) => {
  console.warn(e);
});

// client ready event
client.on('ready', () => {
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

    // register all cmds
    registerCmds();
    // register data files
    registerDataFiles();

    // console logs
    console.log("\n\n\n\n\n \x1b[36m██░ ██▓██   ██▓ ██▓███  ▓█████  ██▀███      ▄▄▄▄    ▒█████  ▄▄▄█████▓\n\x1b[36m▓██░ ██▒▒██  ██▒▓██░  ██▒▓█   ▀ ▓██ ▒ ██▒   ▓█████▄ ▒██▒  ██▒▓  ██▒ ▓▒\n\x1b[36m▒██▀▀██░ ▒██ ██░▓██░ ██▓▒▒███   ▓██ ░▄█ ▒   ▒██▒ ▄██▒██░  ██▒▒ ▓██░ ▒░\n\x1b[36m░▓█ ░██  ░ ▐██▓░▒██▄█▓▒ ▒▒▓█  ▄ ▒██▀▀█▄     ▒██░█▀  ▒██   ██░░ ▓██▓ ░ \n\x1b[36m░▓█▒░██▓ ░ ██▒▓░▒██▒ ░  ░░▒████▒░██▓ ▒██▒   ░▓█  ▀█▓░ ████▓▒░  ▒██▒ ░ \n\x1b[36m ▒ ░░▒░▒  ██▒▒▒ ▒▓▒░ ░  ░░░ ▒░ ░░ ▒▓ ░▒▓░   ░▒▓███▀▒░ ▒░▒░▒░   ▒ ░░   \n\x1b[36m ▒ ░▒░ ░▓██ ░▒░ ░▒ ░      ░ ░  ░  ░▒ ░\n\x1b[36m ▒░   ▒░▒   ░   ░ ▒ ▒░     ░    \n\x1b[36m ░  ░░ ░▒ ▒ ░░  ░░          ░     ░░   ░     ░    ░ ░ ░ ░ ▒    ░      \n\x1b[36m ░  ░  ░░ ░                 ░  ░   ░         ░          ░ ░           \n\x1b[36m        ░ ░                                       ░                   \x1b[0m")
    console.log(`\n \n \n \nSuccessfully connected into discord's gateway(v6)\nScanning for guilds...\n\x1b[36m[-]\x1b[0m ${client.guilds.cache.map(n => n.name + ` (ID: \x1b[36m${n.id}\x1b[0m)`).join(`\x1b[36m\n[-]\x1b[0m `)}`);
    console.log(`Scan completed!\n\nVersion: ${version}\nAll commands are loaded. We are ready to go!\nInvite link: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8\nType ${prefixgen}help to get a list of commands to use!`);

    // activity
    client.user.setActivity(`Hyper BOT v${version} - ${prefixgen}help`, { type: 'LISTENING' });

});

// on guild member join (setwelcome)
client.on('guildMemberAdd', (member) => {
  fs.readFile("./Storage/welcome.json", 'utf8' , (err, data) => {
    if (err) throw err;
    const thing = JSON.parse(data);

    if(thing[member.guild.id]) {
      const message = thing[member.guild.id].message;
      const channel = thing[member.guild.id].channel;

      if(message.includes(`{user}`)) {
        const msg = message.replace(`{user}`, `<@${member.id}>`);
        member.guild.channels.get(channel).send(msg);
    };
  }
 });
});

// on message edit (ads protection)
client.on('messageUpdate', (_oldMessage, newMessage) => {

  if(newMessage.content.includes("https://") || newMessage.content.includes("http://") || newMessage.content.includes("discord.gg") || newMessage.content.includes("discord.me") || newMessage.content.includes("discord.io")) {

    // reading the file
    fs.readFile("./Storage/ads.json", 'utf8' , (err, data) => {
      // if err
      if (err) throw err;
      const db = JSON.parse(data);
      if(db[newMessage.guild.id]) {
        if(newMessage.member.hasPermission("MANAGE_GUILD")) return;
        newMessage.delete();
        newMessage.channel.send(`**Your message contained a link and it was deleted, <@${newMessage.author.id}>**`);
      }
    });
  }

});

// client message event
client.on("message", (message) => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let argresult = args.join(" ");

  // ads protection checks
  if(message.content.includes("https://") || message.content.includes("http://") || message.content.includes("discord.gg") || message.content.includes("discord.me") || message.content.includes("discord.io")) {

    // reading the file
    fs.readFile("./Storage/ads.json", 'utf8' , (err, data) => {
      // if err
      if (err) throw err;
      const db = JSON.parse(data);
      if(db[message.guild.id]) {
        if(message.member.hasPermission("MANAGE_GUILD")) return;
        message.delete();
        message.channel.send(`**Your message contained a link and it was deleted, <@${message.author.id}>**`);
      }
    });
  }

  // custom prefixes
  let prefixes = JSON.parse(fs.readFileSync("./Storage/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id] || prefixes[message.guild.id] === undefined) {
    prefixes[message.guild.id] = {
      prefixes: "h!"
    };
    fs.writeFile("./Storage/prefixes.json", JSON.stringify(prefixes, null, 2), (err) => {
      if (err) console.log(err)
    });
  };
  client.prefixes = prefixes;

  let prefix = prefixes[message.guild.id].prefixes;
  client.prefix = prefix;

  if(!message.content.startsWith(prefix)) return;

  // command hanler
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);

  // logging
  if(logging === true) {
    let loggingOutput;
    if(!argresult || argresult === "") {
      loggingOutput = `[\x1b[36m${moment().format("LLLL")}\x1b[0m] Command ${cmd} was executed by \x1b[36m${message.author.tag}\x1b[0m (ID: \x1b[36m${message.author.id}\x1b[0m)`;
      console.log(loggingOutput);
    } else {
      loggingOutput = `[\x1b[36m${moment().format("LLLL")}\x1b[0m] Command ${cmd} ${argresult} was executed by \x1b[36m${message.author.tag}\x1b[0m (ID: \x1b[36m${message.author.id}\x1b[0m)`;
      console.log(loggingOutput);
    };
  };

});
