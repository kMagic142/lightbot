const { Collection, MessageEmbed } = require("discord.js");
const moment = require('moment');
moment.suppressDeprecationWarnings = true;

const rankEmojis = ['🥇', '🥈', '🥉'];
const pageSize = 10;
const previous = '⬅️';
const next = '➡️';

module.exports = {
    enabled: true,
    name: 'invite leaderboard',
    aliases: ['inv leaderboard'],
    description: 'Displays leaderboard for this  guild\'s invites',
    minArgs: 0,
    maxArgs: null,
    permissions: [],
    requiredRoles: [],
    run: async (message) => {
        let client = message.client;
        let users = new Collection();
        let invites = await message.guild.fetchInvites();


        if(invites < 1) {
            return message.channel.send(client.language.invites.noInvites());
        }


        for(let invite of invites) {
            invite = invite[1];

            if(invite.inviter.bot) continue;
            users.set(invite.inviter.id, +invite.uses);
        }


        users = users.sort((userA, userB) => userA > userB ? -1 : 1);

        var userRank;

        function getDescription(page = 0) {
            let description = '';
            for(let i = page; i < users.array().length && i < (page + pageSize); i++) {
                let userid = users.keyArray()[i];
                let uses = users.get(userid);

                let rank = i + 1;
                if(userid === message.author.id) userRank = rank;
                rank = (rank < 4) ? `${rankEmojis[rank - 1]}` : `**\`#${String(rank).padEnd(3)}\`**`;


                description += `${rank}<@${userid}> - \`${uses} invite uses\`\n`;
            }
            return description;
        }

        const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setAuthor("Invite Leaderboard for this guild", message.guild.iconURL())
        .setThumbnail(message.guild.iconURL())
        .setDescription(getDescription())
        .setFooter(`${userRank ? `Your rank is #${userRank}` : `You have no rank`}`, message.author.avatarURL());

        let page = 1;

        if(users.array().length < 11) {
            return message.channel.send(embed);
        }

        const reply = await message.channel.send(embed);
        let filter = (reaction, user) => user.id !== client.user.id && (reaction.emoji.name === previous || reaction.emoji.name === next) && user.id === message.author.id;
        const collector = reply.createReactionCollector(filter, { time: 60000, dispose: true });

        collector.on('collect', (reaction) => {
            page += (reaction.emoji.name === next ? 1 : -1) * pageSize;

            if(index >= users.array().length) {
                index = 0;
            } else if(index < 0) {
                index = Math.max(users.array().length - pageSize, 0);
            }

            reply.edit(embed.setDescription(getDescription(page)));
        });

        collector.on('remove', (reaction, user) => {
            if(user.id === message.author.id) {
                index += (reaction.emoji.name === next ? 1 : -1) * pageSize;

                if(index >= users.array().length) {
                    index = 0;
                } else if(index < 0) {
                    index = Math.max(users.array().length - pageSize, 0);
                }

                reply.edit(embed.setDescription(getDescription(index)));
            }

        });

        collector.on('end', () => {
            reply.reactions.removeAll();
        });

        reply.react(previous);
        reply.react(next);
    }
};