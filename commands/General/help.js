const { MessageEmbed, Collection } = require("discord.js");
const { readdir } = require('fs').promises;
const path = require('path');
const Data = require("../../data/Data");
const utils = require('../../utils/Utils');

const next = '➡️';
const previous = '⬅️';

var pageData = new Collection();

module.exports = {
    enabled: true,
    name: 'help',
    aliases: ['commands', 'botinfo'],
    description: 'Gives you a list of commands and useful informations about the bot.',
    minArgs: 0,
    maxArgs: null,
    permissions: [],
    requiredRoles: [],
    run: async (message) => {
        var client = message.client;

        const categories = await utils.getDirectories("./commands");

        let page = 0;
        var msg;

        try {
            msg = await message.author.send(await getHelp(categories, page, client, message));
        } catch(e) {
            if(e) throw e;
            return message.channel.send(client.language.help.failed());
        }
    
        await message.channel.send(client.language.help.sent());
        
        await msg.react(previous);
        await msg.react(next);

        let filter = (reaction, user) => user.id !== client.user.id && (reaction.emoji.name === previous || reaction.emoji.name === next) && user.id === message.author.id;
        let collector = msg.createReactionCollector(filter, {time: 120000});

        collector.on('collect', async reaction => {
            page += (reaction.emoji.name === next ? 1 : -1);

            if(page < 0 || page >= pageData.array().length) {
                page = 0;
            }

            await msg.edit(await getHelp(categories, page, client, message));
        });

        collector.on('end', async () => {
            msg.react('⏹️');
            return await msg.edit(msg.embeds[0].setFooter("Time is up. If you want the reactions to work again, please execute the command again."));
        });

    }
};

async function getFiles (dir) {
    const subdirs = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(subdirs.map((subdir) => {
        const res = path.resolve(dir, subdir.name);
        return subdir.isDirectory() ? null : res;
    }));
    return Array.from(new Set(files.flat()));
}


async function getHelp(categories, page, client, message) {
    const embed = new MessageEmbed();
    for(const category of categories) {
        if(path.parse(category).name === "Admin" && message.author.id !== client.owner) continue;
        let fields = [];
        await getFiles(category)
        .then(async cmds => { // jshint ignore:line
            for(const c of cmds) {
                if(!c) continue;
                const command = require(c);

                if(!command.enabled) continue;

                let prefix = await Data.getPrefix(message.guild.id);

                const aliases = (command.aliases instanceof Array) ? (command.aliases.filter(cmd => cmd !== command.name)).join(", ") : command.aliases;
                fields.push({
                    name: `▫️ ${prefix}${command.name} ${command.expectedArgs ? command.expectedArgs : ""}`, 
                    value: `${command.description}\n${aliases ? `Aliases: ${aliases}` : ""}`
                });
            }
        });

        pageData.set(path.parse(category).name, fields);
    }

    embed.setColor(client.embedColor);
    embed.setAuthor(client.user.username, client.user.avatarURL());
    embed.setThumbnail(client.user.avatarURL());

    if(page <= 0) {
        embed.setDescription(client.language.help.description());
    } else {
        embed.setTitle(pageData.keyArray()[page]);

        for (let field of pageData.array()[page]) {
            embed.addField(field.name, field.value);
        }
    }

    return embed;
}