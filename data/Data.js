const fs = require('fs');
var config = require("../Storage/config.json");
let client = require("../index.js").client;
let Data = require("./Data");

let dataType = config.prefferedDataType.toLowerCase() || "json";

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
            getTickets: async (guildid) => {
                let statement = `SELECT ticketenabled, ticketcategory, ticketam FROM light_guilds WHERE id=?`;
                let [rows] = this.mysqlPool.query(statement, [guildid]);

                return {
                    enabled: rows[0].ticketenabled,
                    ticketCategory: rows[0].ticketCategory,
                    denyMultipleTickets: rows[0].ticketam
                };
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
            getTickets: async (guildid) => {
                let statement = `SELECT ticketenabled, ticketcategory, ticketam FROM light_guilds WHERE id=?`;
                let guild = this.sqlitedb.prepare(statement).get(guildid);

                return {
                    enabled: guild.ticketenabled,
                    ticketCategory: guild.ticketCategory,
                    denyMultipleTickets: guild.ticketam
                };
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
            
    
        let statement = `CREATE TABLE IF NOT EXISTS light_guilds(id BIGINT(20) UNIQUE, prefix VARCHAR(8), jlenabled BOOL, jlchannel BIGINT(20), ticketenabled BOOL, ticketcategory BIGINT(20), ticketam BOOL, PRIMARY KEY(id))`;
        this.mysqlPool.execute(statement);
    
        return this.mysqlPool;
};

module.exports.setupSQLite = async () => {
        const SQLite = require('better-sqlite3');

        this.sqlitedb = new SQLite('./Storage/data.db');

        let statement = `CREATE TABLE IF NOT EXISTS light_guilds(id BIGINT(20) UNIQUE, prefix VARCHAR(8), jlenabled BOOL, jlchannel BIGINT(20), ticketenabled BOOL, ticketcategory BIGINT(20), ticketam BOOL, PRIMARY KEY(id))`;

        this.sqlitedb.prepare(statement).run();

        return this.sqlitedb;
};