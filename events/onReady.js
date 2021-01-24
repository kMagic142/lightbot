const fs = require('fs');
const Data = require('../data/Data.js');
const handleExperience = require('../handlers/handleExperience');
const registerCommand = require("../handlers/handleCommand")
var bot;

module.exports = {
    name: 'onReady',
    enabled: true,
    run: async (client) => {
        // client ready event
        client.on('ready', async () => {
            bot = client;

            const prefix = client.config.prefix;
            const lang = client.config.lang;
        
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
            await registerGuildData();

            // register all users
            await registerUserData();
        
            // register all cmds
            await registerCmds();
        
            // startup console logs to make everything seem pretty
            console.log(client.language.LightStartup());
            console.log(`\n\n\nLight BOT is ready to go!\nInvite link: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8\nType ${prefix}help to get a list of commands to use!`);
        
            // activity
            client.user.setActivity(`Light BOT - ${prefix}help`, { type: 'WATCHING' });

            setInterval(async () => {
                handleExperience(client);
            }, 120000);
        
        });
    }
};

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
    }

    for(const command of bot.commands) {
        registerCommand(bot, command);
    }
}
  
async function registerUserData() {
    let dataType = bot.config.prefferedDataType.toLowerCase() || "json";
    switch(dataType) {
        case "mysql": {
            const connection = await Data.setupMySQL();
            let users = bot.users.cache;

            for(var user of users) {
                let statement = `SELECT count(1) FROM light_users WHERE id=?`;
                connection.query(statement, [user[0]])
                .then(([rows, _fields]) => {
                    if(rows[0]['count(1)'] < 1) {
                        let statement = `INSERT INTO light_guilds(id, experience) VALUES (?,?)`;
                        connection.execute(statement, [user[0], 0])
                        .catch(err => console.error(err));
                        bot.userData.set(user[0], { experience: 0 });
                    }
                })
                .catch(err => console.error(err));
            }
            break;
        }
        case "json": {
            if(!fs.existsSync("./Storage/users")) fs.mkdirSync("./Storage/users");
            await bot.getFiles("./Storage/users")
            .then(files => {
                let users = bot.users.cache;

                files.forEach((file) => {
                    let user = require(file);
                    bot.userData.set(file.split("\\").pop().slice(0, -5), user);
                });

                for(let user of users) {
                    if(!bot.userData.keyArray().includes(user[0])) {
                        if(user[1].bot) continue;
                        fs.writeFileSync(`./Storage/users/${user[0]}.json`, JSON.stringify({ experience: 0 }, null, 2));
                        bot.userData.set(user[0], { experience: 0 });
                    }
                }
            });
            break;
        }
        case "sqlite": {
            let connection = await Data.setupSQLite();

            let users = bot.users.cache;

            for(let user of users) {
                let statement = `SELECT count(1) FROM light_users WHERE id=?`;
                let result = await connection.prepare(statement).get(user[0]);
                if(result['count(1)'] < 1) {
                    let statement = `INSERT INTO light_users(id, experience) VALUES (?,?)`;
                    connection.prepare(statement).run(user[0], 0);
                    bot.userData.set(user[0], { experience: 0 });
                }
            }
            break;
        }
    }
}

async function registerGuildData() {
    let dataType = bot.config.prefferedDataType.toLowerCase() || "json";
    switch(dataType) {
        case "mysql": {
            const connection = await Data.setupMySQL();
            let guilds = bot.guilds.cache;

            for(var guild of guilds) {
                let statement = `SELECT count(1) FROM light_guilds WHERE id=?`;
                connection.query(statement, [guild[0]])
                .then(([rows, _fields]) => {
                    if(rows[0]['count(1)'] < 1) {
                        let statement = `INSERT INTO light_guilds(id, prefix) VALUES (?,?)`;
                        connection.execute(statement, [guild[0], bot.config.prefix])
                        .catch(err => console.error(err));
                    }
                })
                .catch(err => console.error(err));
            }
            break;
        }
        case "json": {
            if(!fs.existsSync("./Storage/guilds")) fs.mkdirSync("./Storage/guilds");
            await bot.getFiles("./Storage/guilds")
            .then(files => {
                let guilds = bot.guilds.cache;

                files.forEach((file) => {
                    let guild = require(file);
                    bot.guildData.set(file.split("\\").pop().slice(0, -5), guild);
                });

                for(let guild of guilds) {
                    if(!bot.guildData.keyArray().includes(guild[0])) {
                        fs.writeFileSync(`./Storage/guilds/${guild[0]}.json`, '{}');
                        bot.guildData.set(guild[0], {});
                    }
                }
            });
            break;
        }
        case "sqlite": {
            let connection = await Data.setupSQLite();

            let guilds = bot.guilds.cache;

            for(let guild of guilds) {
                let statement = `SELECT count(1) FROM light_guilds WHERE id=?`;
                let result = await connection.prepare(statement).get(guild[0]);
                if(result['count(1)'] < 1) {
                    let statement = `INSERT INTO light_guilds(id, prefix) VALUES (?,?)`;
                    connection.prepare(statement).run(guild[0], bot.config.prefix);
                }
            }
            break;
        }
    }
}