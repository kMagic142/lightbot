const { Rcon } = require('rcon-client');

module.exports = {
    enabled: true,
    name: 'rcon send',
    aliases: ['send', 'cmd send'],
    description: 'Sends a command to your minecraft server.',
    minArgs: 1,
    maxArgs: null,
    permissions: ["ADMINISTRATOR"],
    requiredRoles: [],
    run: async (message, args, text) => {
        const client = message.client;
        
        let rcon;
        
        Rcon.connect({
            host: client.config.rcon.host,
            port: client.config.rcon.port,
            password: client.config.rcon.password
        }).then(conn => {
            rcon = conn;
        }).catch(e => {
            return console.error(e);
        });

        rcon.send(text).then(response => {
            message.channel.send(response);
        });

        return rcon.end();

    }
};