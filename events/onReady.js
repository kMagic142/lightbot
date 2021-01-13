const registerCommand = require('../handlers/handleCommand.js');
let bot;

let callback = (err) => {
    if(err) throw err;
};

module.exports = {
    name: 'onReady',
    enabled: true,
    run: async (client) => {
        // client ready event
        client.on('ready', async () => {

            bot = client;

            const prefix = client.config.prefix;
            const embedColor = client.config.color;
            const lang = client.config.lang;

            // set value for embed colors
            client.embedColor = embedColor;
        
            // set the default prefix as a client value
            client.prefix = prefix;
        
            // sets value for language preffered, and checks the language
            try {
                client.language = require(`../messages/messages_${lang}.js`);
                console.log(`[Light] Loaded lang file "${lang}"`);
            } catch(e) {
                client.language = require(`../messages/messages_en-US.js`);
                console.log(new TypeError(`[Light] The 'lang' value must be en_US or RO.\nEnglish was set for now to avoid closing the process, but please fix the problem.`));
                console.log(`[Light] Loaded lang file "en_US"`);
            }
        
            // register guild data files
            await registerGuildFiles();
        
            // register all cmds
            await registerCmds();
        
            // startup console logs to make everything seem pretty
        
            console.log(client.language.LightStartup())
            console.log(`\n\n\nLight BOT is ready to go!\nInvite link: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8\nType ${prefix}help to get a list of commands to use!`);
        
            // activity
            client.user.setActivity(`Light BOT - ${prefix}help`, { type: 'WATCHING' });
        
        });
    }
}

async function registerCmds() {
    await bot.getFiles("./commands")
    .then(files => {
        files.forEach((f) =>{
            let cmd = require(f);
            bot.commands.push(cmd);
        });
    });
    
    if(bot.commands.length <= 0) {
        console.log(new Error("[Light] An error occurred! No commands are being registered. Please issue a ticket."));
        return process.exit(1);
    };
  
    for(const command of bot.commands) {
      registerCommand(bot, command);
    }
}

async function checkGuildData() {
    let guilds = bot.guilds.cache;
    for(var guild of guilds) {
      if(!bot.guildData.keyArray().includes(guild[0])) {
        fs.writeFileSync(`./Storage/guilds/${guild[0]}.json`, '{}', callback)
      };
    }
}
  
async function registerGuildFiles() {
    await bot.getFiles("./Storage/guilds")
    .then(async files => {
      files.forEach(async (file) => {
        let guild = require(file);
        bot.guildData.set(file.split("\\").pop().slice(0, -5), guild);
      });
      await checkGuildData();
    });
}