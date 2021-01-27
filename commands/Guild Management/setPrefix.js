const Data = require("../../data/Data.js");

module.exports = {
    enabled: true,
    name: 'setprefix',
    aliases: 'setguildprefix',
    description: 'Sets the guild prefix',
    expectedArgs: '<"newPrefix">',
    minArgs: 1,
    maxArgs: null,
    permissions: ["MANAGE_GUILD"],
    requiredRoles: [],
    run: async (message, _args, text) => {
        var client = message.client;
        var user = message.author;
        let prefix;
        try {
            prefix = text.match(/\"(.*?)\"/) || text.match(/\'(.*?)\'/);

            // select the correct prefix from the match output
            prefix = prefix[1];
        } catch(err) {
            if(err) throw err;
            return message.channel.send(client.language.setPrefix.incorrectUsage(client, user));
        }

        // check if the prefix is too long
        if(prefix.length > 8) {
            return message.channel.send(client.language.setPrefix.tooLong(client, user));
        }

        Data.setPrefix(message.guild.id, prefix);
        return message.channel.send(client.language.setPrefix.success(prefix, client, user));
    }
};