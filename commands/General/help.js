const { MessageEmbed } = require("discord.js");
const Data = require("../../data/Data");
var prefix;

module.exports = {
    enabled: true,
    name: 'help',
    aliases: ['commands', 'botinfo'],
    description: 'Gives you a list of commands and useful informations about the bot.',
    minArgs: 0,
    maxArgs: null,
    permissions: [],
    requiredRoles: [],
    run: async (message, args, text) => {
        var client = message.client;
        var embed;
        
        prefix = await Data.getPrefix(message.guild.id);

        embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(client.user.username, client.user.avatarURL())
        .setThumbnail(client.user.avatarURL())
        .setDescription(client.language.help.description());

        embed = await getCommands(client.commands, embed, client);
        
        return message.channel.send(embed);
    }
};

async function getCommands(commands, embed, client, page = 0, pageSize = 5) {
    let title = [];
    let description = [];
    let categories = await client.getDirectories("./commands");
    console.log(categories);
    for (let i = page; i < commands.length && i < (page + pageSize); i++) {
        command = commands[i];

        let aliases = (command.aliases instanceof Array) ? (command.aliases.filter(cmd => cmd !== command.name)).join(", ") : command.aliases || "none";

        title.push(`${prefix}${command.name} ${command.expectedArgs ? command.expectedArgs : ""}`);
        description.push(`Aliases: ${aliases}\n${command.description}`);
    }

    categories.forEach(category => {
        embed.addField(category, `\n${title[i]}\n\n${description[i]}\n`);
    });

    return embed;

}