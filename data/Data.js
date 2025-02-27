const fs = require('fs');
var config = require("../Storage/config.json");
let client = require("../app.js").client;

let dataType = config.prefferedDataType.toLowerCase() || "json";

var filters = require('../Storage/words.json').filters;

switch(dataType) {
    case "mysql":
        module.exports = {
            getGuild: async (id) => {
                let statement = `SELECT * FROM light_guilds WHERE id=?`;
                let [rows] = await this.mysqlPool.query(statement, [id]);

                return rows[0];
            },
            addGuild: async (id) => {
                let statement = `INSERT INTO light_guilds(id, prefix) VALUES(?,?)`;
                this.mysqlPool.execute(statement, [id, config.prefix])
                .catch(err => console.error(err));
            },
            removeGuild: async (id) => {
                let statement = `DELETE FROM light_guilds WHERE id=?`;
                this.mysqlPool.execute(statement, [id])
                .catch(err => console.error(err));
            },
            getPrefix: async (id) => {
                let statement = `SELECT prefix FROM light_guilds WHERE id=?`;
                let [rows] = await this.mysqlPool.query(statement, [id]);

                return rows[0].prefix;
                
            },
            setPrefix: async (id, prefix) => {
                let statement = `UPDATE \`light_guilds\` SET prefix=? WHERE id=?`;
                this.mysqlPool.execute(statement, [prefix, id])
                .catch(err => console.error(err));
            },
            getJoinLeave: async (guildid) => {
                let statement = `SELECT jlenabled, jlchannel FROM light_guilds WHERE id=?`;
                let [rows] = await this.mysqlPool.execute(statement, [guildid]);

                return {
                    enabled: rows[0].jlenabled,
                    channel: rows[0].jlchannel
                };
            },
            setJoinLeave: async (guildid, channel, enabled) => {
                let statement = `UPDATE light_guilds SET jlenabled=?, jlchannel=? WHERE id=?`;
                this.mysqlPool.execute(statement, [enabled, channel, guildid])
                .catch(err => console.error(err));
            },
            getServerStatus: async (guildid) => {
                let statement = `SELECT svstenabled, svstcategory FROM light_guilds WHERE id=?`;
                let [rows] = await this.mysqlPool.execute(statement, [guildid]);

                return {
                    enabled: rows[0].svstenabled,
                    category: rows[0].svstcategory
                };
            },
            setServerStatus: async (guildid, category, enabled) => {
                let statement = `UPDATE light_guilds SET svstenabled=?, svstcategory=? WHERE id=?`;
                this.mysqlPool.execute(statement, [enabled, category, guildid])
                .catch(err => console.error(err));
            },
            getTickets: async (guildid) => {
                let statement = `SELECT ticketenabled, ticketcategory, ticketam FROM light_guilds WHERE id=?`;
                let [rows] = this.mysqlPool.query(statement, [guildid]);

                return {
                    enabled: rows[0].ticketenabled,
                    ticketCategory: rows[0].ticketCategory,
                    denyMultipleTickets: rows[0].ticketam
                };
            },
            getExpEnabled: async (guildid) => {
                let statement = `SELECT enableexp FROM light_guilds WHERE id=?`;
                let [rows] = await this.mysqlPool.query(statement, [guildid]);

                return rows[0].enableexp;
            },
            pushExperience: async (experience, userid) => {
                let statement = `UPDATE light_users SET experience=? WHERE id=?`;

                this.mysqlPool.execute(statement, [experience, userid]);
            },
            getExperience: async (userid) => {
                let statement = `SELECT experience, level FROM light_users WHERE id=?`;
                let [rows] = await this.mysqlPool.query(statement, [userid]);

                return rows[0];
            },
            getCoins: async (userid) => {
                let statement = `SELECT coins FROM light_users WHERE id=?`;
                let [rows] = await this.mysqlPool.query(statement, [userid]);

                return rows[0];
            },
            setWarn: async (userid, guildid, reason, timestamp, warnid) => {
                let statement = `INSERT INTO light_warns(id, guildid, reason, timestamp, warnid) VALUES (?,?,?,?)`;
                this.mysqlPool.execute(statement, [userid, guildid, reason, timestamp, warnid]);
            },
            getWarns: async (userid) => {
                let statement = `SELECT * FROM light_warns WHERE id=?`;
                let [rows] = await this.mysqlPool.query(statement, [userid]);

                return rows[0];
            },
            removeWarn: async (userid, guildid, warnid) => {
                let statement = `DELETE FROM light_warns WHERE id=? AND guildid=? AND warnid=?`;
                this.mysqlPool.execute(statement, [userid, guildid, warnid]);
            },
            getWarnsChannel: async (guildid) => {
                let statement = `SELECT warnschannel FROM light_guilds WHERE id=?`;
                let [rows] = await this.mysqlPool.query(statement, [userid]);

                return rows[0];
            },
            setWarnLogs: async (guildid, channel) => {
                let statement = `UPDATE light_guilds SET warnschannel=? WHERE id=?`;
                this.mysqlPool.execute(statement, [channel, guildid]);
            },
            getFilterEnabled: async (guildid) => {
                let statement = `SELECT wordfiltering FROM light_guilds WHERE id=?`;
                return this.mysqlPool.query(statement, [guildid]);
            },
            getFilters: async () => {
                return filters;
            },
            getInviteRewards: async () => {
                throw TypeError("Invite rewards are not supported on SQLite or MySQL yet.");
            },
            setServerStatusChannels: async () => {
                throw TypeError("Changing Server Status channels is not available right now for users using MySQL. Feature will be supported in a future version.");
            }
        };
        break;
    case "json":
        module.exports = {
            getGuild: async (id) => {
                let guild = client.guildData.get(id);
                return guild;
            },
            addGuild: async (id) => {
                fs.writeFileSync(`./Storage/guilds/${id}.json`, {});
            },
            removeGuild: async (id) => {
                fs.unlinkSync(`./Storage/guilds/${id}.json`);
            },
            getPrefix: async (id) => {
                let prefix = client.guildData.get(id).prefix;
                return prefix;
            },
            setPrefix: async (id, prefix) => {
                let guild = client.guildData.get(id);
                
                guild.prefix = prefix;

                fs.writeFileSync(`./Storage/guilds/${id}.json`, JSON.stringify(guild, null, 2));
                client.guildData.set(id, guild);
            },
            getJoinLeave: async (guildid) => {
                let guild = await client.guildData.get(guildid);

                if(!guild.joinLeave) {
                    guild.joinLeave = {
                        enabled: true
                    };
                }

                return guild.joinLeave;
            },
            setJoinLeave: async (guildid, channel, enabled) => {
                let guild = client.guildData.get(guildid);

                guild.joinLeave = {
                    enabled: enabled,
                    channel: channel
                };

                fs.writeFileSync(`./Storage/guilds/${guildid}.json`, JSON.stringify(guild, null, 2));
                client.guildData.set(guildid, guild);
            },
            getServerStatus: async (guildid) => {
                let guild = await client.guildData.get(guildid);

                if(!guild.serverStatus) {
                    guild.joinLeave = {
                        enabled: true
                    };
                }

                return guild.serverStatus;
            },
            setServerStatus: async (guildid, category, enabled) => {
                let guild = client.guildData.get(guildid);

                guild.serverStatus = {
                    enabled: enabled,
                    category: category
                };

                fs.writeFileSync(`./Storage/guilds/${guildid}.json`, JSON.stringify(guild, null, 2));
                client.guildData.set(guildid, guild);
            },
            setServerStatusChannels: async (humans, bots, total) => {
                let config = [
                    {
                        type: "humans",
                        id: humans
                    },
                    {
                        type: "bots",
                        id: bots
                    },
                    {
                        type: "total",
                        id: total
                    }
                ];

                client.config.serverStatus.channels = config;

                fs.writeFileSync(`./config.json`, JSON.stringify(client.config, null, 2));
            },
            getTickets: function (guildid) {
                let guild = client.guildData.get(guildid) || null;
            
                if(!guild.tickets) {
                    guild.tickets = {
                        enabled: true,
                        ticketCategory: "",
                        denyMultipleTickets: true,
                    };
            
                    fs.writeFileSync(`./Storage/guilds/${guildid}.json`, JSON.stringify(guild, null, 2));
                    client.guildData.set(guildid, guild);
                    return this.getTickets(guildid);
                }
            
                return guild.tickets;
            },
            getExpEnabled: async (guildid) => {
                let guild = client.guildData.get(guildid) || null;

                if(!guild.enableExp) {
                    guild.enableExp = false;

                    fs.writeFileSync(`./Storage/guilds/${guildid}.json`, JSON.stringify(guild, null, 2));
                    client.guildData.set(guildid, guild);
                }

                return guild.enableExp;
            },
            pushExperience: async (experience, userid) => {
                let user = client.userData.get(userid) || null;
                
                user = experience;
                
                fs.writeFileSync(`./Storage/users/${userid}.json`, JSON.stringify(user, null, 2));
                client.userData.set(userid, user);
            },
            getExperience: async (userid) => {
                let user = client.userData.get(userid) || null;

                if(!user.experience || user.level) {
                    user.experience = user.experience || 0;
                    user.level = user.level || 0;

                    fs.writeFileSync(`./Storage/users/${userid}.json`, JSON.stringify(user, null, 2));
                    client.userData.set(userid, user);
                }
                
                return { experience: user.experience, level: user.level };
            },
            getCoins: async (userid) => {
                let user = client.userData.get(userid) || null;

                if(!user.coins) {
                    user.coins = 0;

                    fs.writeFileSync(`./Storage/users/${userid}.json`, JSON.stringify(user, null, 2));
                    client.userData.set(userid, user);
                }

                return { coins: user.coins };
            },
            setWarn: async (userid, guildid, reason, timestamp, warnid) => {
                let user = client.userData.get(userid);

                if(!user.warnings) {
                    user.warnings = [
                        {
                            guild: guildid,
                            timestamp: timestamp,
                            id: warnid,
                            reason: reason
                        }
                    ];
                } else {
                    user.warnings.push(
                        {
                            guild: guildid,
                            timestamp: timestamp,
                            id: warnid,
                            reason: reason
                        }
                    );
                }

                fs.writeFileSync(`./Storage/users/${userid}.json`, JSON.stringify(user, null, 2));
                client.userData.set(userid, user);
            },
            getWarns: async (userid) => {
                return client.userData.get(userid).warnings || null;
            },
            removeWarn: async (userid, warnid, guildid) => {
                let user = client.userData.get(userid);

                let warn = user.warnings.findIndex(w => w.guild === guildid && w.id === warnid);
                user.warnings.splice(warn, warn >= 0 ? 1 : 0);

                client.userData.set(userid, user);
                fs.writeFileSync(`./Storage/users/${userid}.json`, JSON.stringify(user, null, 2));
            },
            getWarnsChannel: async (guildid) => {
                let channel = client.guildData.get(guildid).warnsChannel || null;

                return channel;
            },
            setWarnLogs: async (guildid, channel) => {
                let guild = client.guildData.get(guildid) || null;

                guild.warnsChannel = channel;

                fs.writeFileSync(`./Storage/guilds/${guildid}.json`, JSON.stringify(guild, null, 2));
                client.guildData.set(guildid, guild);
            },
            getFilterEnabled: async (guildid) => {
                let guild = client.guildData.get(guildid) || null;

                if(!guild.enableWordFiltering) {
                    guild.enableWordFiltering = false;

                    fs.writeFileSync(`./Storage/guilds/${guildid}.json`, JSON.stringify(guild, null, 2));
                    client.guildData.set(guildid, guild);
                }

                return guild.enableWordFiltering;
            },
            getFilters: async () => {
                return filters;
            },
            getInviteRewards: (guildid) => {
                let guild = client.guildData.get(guildid) || null;

                if(!guild.inviteRewards) 
                {
                    guild.inviteRewards = 
                    {
                        enabled: 0,
                        rewards: []
                    };

                    fs.writeFileSync(`./Storage/guilds/${guildid}.json`, JSON.stringify(guild, null, 2));
                    client.guildData.set(guildid, guild);
                }

                return guild.inviteRewards;

            }
        };
        break;
    case "sqlite":
        module.exports = {
            getGuild: async (id) => {
                let statement = `SELECT * FROM light_guilds WHERE id=?`;
                return this.sqlitedb.prepare(statement).get(id);
            },
            addGuild: async (id) => {
                let statement = `INSERT INTO light_guilds(id, prefix) VALUES(?,?)`;
                this.sqlitedb.prepare(statement).run(id, config.prefix);
            },
            removeGuild: async (id) => {
                let statement = `DELETE FROM light_guilds WHERE id=?`;
                this.sqlitedb.prepare(statement).run(id);
            },
            getPrefix: async (id) => {
                let statement = `SELECT prefix FROM light_guilds WHERE id=?`;
                
                return this.sqlitedb.prepare(statement).get(id).prefix;
            },
            setPrefix: async (id, prefix) => {
                let statement = `UPDATE \`light_guilds\` SET prefix=? WHERE id=?`;

                this.sqlitedb.prepare(statement).run(prefix, id);
            },
            getJoinLeave: async (guildid) => {
                let statement = `SELECT jlenabled, jlchannel FROM light_guilds WHERE id=?`;
                let result = this.sqlitedb.prepare(statement).get(guildid);

                return {
                    enabled: result.jlenabled,
                    channel: result.jlchannel
                };
            },
            setJoinLeave: async (guildid, channel, enabled) => {
                let statement = `UPDATE light_guilds SET jlenabled=?, jlchannel=? WHERE id=?`;
                this.sqlitedb.prepare(statement).run(enabled, channel, guildid);
            },
            getServerStatus: async (guildid) => {
                let statement = `SELECT svstenabled, svstcategory FROM light_guilds WHERE id=?`;
                let result = this.sqlitedb.prepare(statement).get(guildid);

                return {
                    enabled: result.svstenabled,
                    category: result.svstcategory
                };
            },
            setServerStatus: async (guildid, category, enabled) => {
                let statement = `UPDATE light_guilds SET svstenabled=?, svstcategory=? WHERE id=?`;
                this.sqlitedb.prepare(statement).run(enabled, category, guildid);
            },
            getTickets: async (guildid) => {
                let statement = `SELECT ticketenabled, ticketcategory, ticketam FROM light_guilds WHERE id=?`;
                let guild = this.sqlitedb.prepare(statement).get(guildid);

                return {
                    enabled: guild.ticketenabled,
                    ticketCategory: guild.ticketCategory,
                    denyMultipleTickets: guild.ticketam
                };
            },
            getExpEnabled: async (guildid) => {
                let statement = `SELECT enableexp FROM light_guilds WHERE id=?`;
                return this.sqlitedb.prepare(statement).get(guildid).enableexp;
            },
            pushExperience: async (experience, userid) => {
                let statement = `UPDATE light_users SET experience=? WHERE id=?`;

                this.sqlitedb.prepare(statement).run(experience, userid);
            },
            getExperience: async (userid) => {
                let statement = `SELECT experience, level FROM light_users WHERE id=?`;
                return this.sqlitedb.prepare(statement).get(userid);
            },
            getCoins: async (userid) => {
                let statement = `SELECT coins FROM light_users WHERE id=?`;
                return this.sqlitedb.prepare(statement).get(userid);
            },
            setWarn: async (userid, guildid, reason, timestamp, warnid) => {
                let statement = `INSERT INTO light_warns(id, guildid, reason, timestamp, warnid) VALUES (?,?,?,?)`;
                this.sqlitedb.prepare(statement).get(userid, guildid, reason, timestamp, warnid);
            },
            getWarns: async (userid) => {
                let statement = `SELECT * FROM light_warns WHERE id=?`;
                return this.sqlitedb.prepare(statement).get(userid);
            },
            removeWarn: async (userid, guildid, warnid) => {
                let statement = `DELETE FROM light_warns WHERE id=? AND guildid=? AND warnid=?`;
                this.sqlitedb.prepare(statement).run(userid, guildid, warnid);
            },
            getWarnsChannel: async (guildid) => {
                let statement = `SELECT warnschannel FROM light_guilds WHERE id=?`;
                return this.sqlitedb.prepare(statement).get(guildid);
            },
            setWarnLogs: async (guildid, channel) => {
                let statement = `UPDATE light_guilds SET warnschannel=? WHERE id=?`;
                this.sqlitedb.prepare(statement).run(channel, guildid);
            },
            getFilterEnabled: async (guildid) => {
                let statement = `SELECT wordfiltering FROM light_guilds WHERE id=?`;
                return this.sqlitedb.prepare(statement).run(guildid);
            },
            getFilters: async () => {
                return filters;
            },
            getInviteRewards: async () => {
                throw TypeError("Invite rewards are not supported on SQLite or MySQL yet.");
            },
            setServerStatusChannels: async () => {
                throw TypeError("Changing Server Status channels is not available right now for users using SQLite. Feature will be supported in a future version.");
            }
        };
        break;
}

module.exports.setupMySQL = async () => {
    const mysql = require('mysql2');
    
    
        let hostname = config.mysql.hostname;
        let port = config.mysql.port;
        let database = config.mysql.database;
        let username = config.mysql.username;
        let password = config.mysql.password;
        let maximumConnections = config.mysql.maximumConnections;
        let connectionTimeout = config.mysql.connectionTimeout;
    
    
        this.mysqlPool = mysql.createPool({
            host: hostname,
            user: username,
            database: database,
            password: password,
            port: port,
            waitForConnections: true,
            connectionLimit: maximumConnections,
            connectTimeout: connectionTimeout,
            queueLimit: 0
        }).promise();
    
        console.log(`[Light] Initialized MySQL ("${username}"@"${hostname}")`);
            
    
        let guilds = `CREATE TABLE IF NOT EXISTS light_guilds(id BIGINT(20) UNIQUE, prefix VARCHAR(8), jlenabled BOOL, jlchannel BIGINT(20), ticketenabled BOOL, ticketcategory BIGINT(20), ticketam BOOL, enableexp BOOL, warnschannel BIGINT(20), wordFiltering BOOL, svstenabled BOOL, svstcategory BIGINT(20) PRIMARY KEY(id))`;
        let users = `CREATE TABLE IF NOT EXISTS light_users(id BIGINT(20) experience BIGINT, level REAL, coins BIGINT PRIMARY KEY(id))`;
        let warnings = `CREATE TABLE IF NOT EXISTS light_warnings(id BIGINT(20) guildid BIGINT, reason TEXT, timestamp TEXT, warnid TEXT PRIMARY KEY(id))`;
        this.mysqlPool.execute(guilds);
        this.mysqlPool.execute(users);
        this.mysqlPool.execute(warnings);
    
        return this.mysqlPool;
};

module.exports.setupSQLite = async () => {
        const SQLite = require('better-sqlite3');

        this.sqlitedb = new SQLite('./Storage/data.db');

        let guilds = `CREATE TABLE IF NOT EXISTS light_guilds(id BIGINT(20) UNIQUE, prefix VARCHAR(8), jlenabled BOOL, jlchannel BIGINT(20), ticketenabled BOOL, ticketcategory BIGINT(20), ticketam BOOL, enableexp BOOL, warnschannel BIGINT(20), wordFiltering BOOL, svstenabled BOOL, svstcategory BIGINT(20) PRIMARY KEY(id))`;
        let users = `CREATE TABLE IF NOT EXISTS light_users(id BIGINT(20) experience BIGINT, level REAL, coins BIGINT PRIMARY KEY(id))`;
        let warnings = `CREATE TABLE IF NOT EXISTS light_warnings(id BIGINT(20) guildid BIGINT, reason TEXT, timestamp TEXT, warnid TEXT PRIMARY KEY(id))`;
        this.sqlitedb.prepare(guilds).run();
        this.sqlitedb.prepare(users).run();
        this.sqlitedb.prepare(warnings).run();

        return this.sqlitedb;
};