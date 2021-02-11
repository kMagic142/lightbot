const { MessageEmbed } = require('discord.js');
const Data = require('../data/Data.js');

module.exports = {
    generals: {
        noPerm: () => {
            return "You do not have the permission required for this command.";
        },
        noRoles: (role) => {
            return `You must have the \`${role}\` to use this command.`;
        },
        incorrectUsage: (prefix, alias, expectedArgs) => {
            return `Incorrect usage! Use \`${prefix}${alias} ${expectedArgs}\``;
        }
    },
    ping: (client, user) => {
        return `Hey <@${user.id}>! My ping is ${client.ws.ping}ms.`;
    },
    setPrefix: {
        tooLong: () => {
            return `That prefix is too long! Try something with 8 or less characters.`;
        },
        success: (prefix) => {
            return `Successfully set this guild's prefix to \`${prefix}\`!`;
        },
        incorrectUsage: () => {
            return `Prefix entered wrongly. Try again and type the prefix like this: "yourPrefix"`;
        }
    },
    joinLeave: {
        joinMessage: (member) => {
            return `Welcome, **<@${member.id}>**! Please enjoy your stay in **${member.guild.name}**`;
        },
        leaveMessage: (member) => {
            return `**<@${member.id}>** has left the guild.`;
        },
        disabled: () => {
            return `Welcome messages are disabled for this guild.`;
        },
        status: (status) => {
            if(status) {
                return `Welcome messages are now enabled for this guild.`;
            } else {
                return `Welcome messages are now disabled for this guild.`;
            }
        },
        noChannelID: () => {
            return `There is no channel id linked with this guild. Please proceed to run the command again without the \`enable\` at the end to begin setup.`;
        },
        setup: {
            channelSetup: (client) => {
                const embed = new MessageEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .setColor(client.embedColor)
                .addField('Setting up guild join and guild leave messages...',
            `To set everything up, you first need to have a channel in which I can announce when members join or leave the guild.
            Please copy your desired channel's ID or NAME (with or without #) and paste it in here.
            Make sure I have access to that channel before you proceed!`)
                .setFooter("Type cancel if you'd like to dismiss this setup.");
                return embed;
            },
            invalidChannel: () => {
                return `The channel you entered is invalid, please try again.`;
            },
            timeError: () => {
                return `Time expired. Please run the command again if you wish to continue.`;
            },
            canceled: () => {
                return `Setup canceled. Run the command again if you wish to proceed with the setup.`;
            },
            success: (channel, _message, client) => {
                const embed = new MessageEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .setColor(client.embedColor)
                .addField('Join / Leave announcements successfully enabled for this guild!',
            `Join and Leave announcements have been enabled for this guild in <#${channel.id}>. If you wish to modify any
            messages, please visit the coresponding language file or use the web dashboard.`);
                return embed;
            }
        }
    },
    serverStatus: {
        disabled: () => {
            return `Server status isn't enabled for this guild.`;
        },
        status: (status) => {
            if(status) {
                return `Server Status is now enabled in this guild.`;
            } else {
                return `Server Status is now disabled in this guild.`;
            }
        },
        noCategoryID: () => {
            return `There is no category ID linked. Please proceed to run the command again without the \`enable\` at the end to begin setup.`;
        },
        setup: {
            categorySetup: (client) => {
                const embed = new MessageEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .setColor(client.embedColor)
                .addField('Setting up server status...',
            `To set everything up, you first need to have a category id in which I can create channels.
            Please copy your desired category's ID or name and paste it in here.
            Make sure I have access to that category before you proceed!`)
                .setFooter("Type cancel if you'd like to dismiss this setup.");
                return embed;
            },
            invalidCategory: () => {
                return `The category you entered is invalid, please try again.`;
            },
            timeError: () => {
                return `Time expired. Please run the command again if you wish to continue.`;
            },
            canceled: () => {
                return `Setup canceled. Run the command again if you wish to proceed with the setup.`;
            },
            success: (client) => {
                const embed = new MessageEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .setColor(client.embedColor)
                .addField('Server Status is successfully enabled for this guild!',
            `Server Status has been enabled in this guild. If you wish to modify any channel names, please visit the coresponding language file or use the web dashboard.`);
                return embed;
            }
        }
    },
    warnlogs: {
        setup: {
            channelSetup: (client) => {
                const embed = new MessageEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .setColor(client.embedColor)
                .addField('Setting up guild warn logs channel...',
            `To set everything up, you first need to have a channel in which I can announce when members get warned or their warns get removed.
            Please copy your desired channel's ID or NAME (with or without #) and paste it in here.
            Make sure I have access to that channel before you proceed!`)
                .setFooter("Type cancel if you'd like to dismiss this setup.");
                return embed;
            },
            invalidChannel: () => {
                return `The channel you entered is invalid, please try again.`;
            },
            timeError: () => {
                return `Time expired. Please run the command again if you wish to continue.`;
            },
            canceled: () => {
                return `Setup canceled. Run the command again if you wish to proceed with the setup.`;
            },
            success: (channel, _message, client) => {
                const embed = new MessageEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .setColor(client.embedColor)
                .addField('Warn logging is successfully set up for this guild!',
            `Warn logging has been enabled for this guild in <#${channel.id}>. If you wish to modify any
            messages, please visit the coresponding language file or use the web dashboard.`);
                return embed;
            }
        },
        warn: (author, member, reason, warnid) => {
            const embed = new MessageEmbed()
            .setAuthor(`${author.username} warned someone!`, author.avatarURL())
            .setColor(author.client.embedColor)
            .addField(`Warned user: ${member.user.tag}`, `ID: ${member.id}\nWarn ID: ${warnid}\nReason: ${reason}`);
            return embed;
        },
        unwarn: (author, member, warnid) => {
            const embed = new MessageEmbed()
            .setAuthor(`${author.username} unwarned someone!`, author.avatarURL())
            .setColor(author.client.embedColor)
            .addField(`Warned user: ${member.tag}`, `ID: ${member.id}\nWarn ID: ${warnid}`);
            return embed;
        }
    },
    tickets: {
        add: {
            notTicketChannel: () => {
                return `This is not a ticket channel. Please try again by executing this command in your open ticket channel.`;
            },
            incorrectUsage: () => {
                return `Incorrect usage! You need to mention a guild member.`;
            },
            success: () => {
                return `Member was successfully added to your ticket!`;
            }
        },
        remove: {
            notTicketChannel: () => {
                return `This is not a ticket channel. Please try again by executing this command in your open ticket channel.`;
            },
            incorrectUsage: () => {
                return `Incorrect usage! You need to mention a guild member.`;
            },
            success: () => {
                return `Member was successfully removed from your ticket!`;
            }
        },
        close: {
            notTicketChannel: () => {
                return `This is not a ticket channel. Please try again by executing this command in your open ticket channel.`;
            },
            success: () => {
                return `🕐 | This ticket will be closing in 1 minute from now.`;
            }
        },
        open: {
            denyMulipleTickets: () => {
                return `You already have a ticket! Please wait for your ticket to get concluded before creating another.`;
            },
            noCategory: () => {
                return `The category ID isn't defined in your database. Please create a new category, copy it's ID and add it to the bot's configuration. Don't forget to add permissions for your desired support role to the category, as the channels inhert the category's permissions.`;
            },
            ticketOpened: (channel, client, user) => {
                const embed = new MessageEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .setColor(client.embedColor)
                .addField('Ticket informations', 
                `Created by ${user.tag} (${user.id})
                Time of creation: ${channel.createdAt}`)
                .setFooter(`Please describe your problem as best as you can.`);

                return embed;
            }
        }
    },
    experience: {
        info: (data, nextExp) => {
            return `Gathered EXP: **${data.experience} EXP**. Level **${Math.floor(data.level)}** \`[${data.experience}/${nextExp} EXP]\``;
        },
        levelUp: (user, level, nextLevelExp) => {
            return `Hurrayyy <@${user.id}>!! You just **leveled up** to Level **${Math.floor(level)}**!\nYou need **${nextLevelExp}** exp to level up again.`;
        }
    },
    ban: {
        selfban: () => {
            return `:x: | Don't ban yourself!`;
        },
        banbot: () => {
            return `:x: | If you wish to get me out of this server, please ban me manually.`;
        },
        roleHigher: () => {
            return `:x: | You cannot ban this member.`;
        },
        noBotPermission: () => {
            return `:x: | Failed in banning that member. Make sure that I have the "Ban Members" permission!`;
        },
        bannedSuccessfully: (member, reason) => {
            return `✅ | ${member.user.tag} is now banned. ${reason ? ` Reason: ${reason}` : ''}`;
        },
        confirmation: (guildMember) => {
            return `
Confirm that this is the right member.

> User: **<@${guildMember.id}>**
> ID: **${guildMember.id}**
> Tag: **${guildMember.user.tag}**

\`Please react with ✅ if it is correct or with ❌ if not.\``;
        },
        wrongMember: () => {
            return `:x: | Got it. Try again and make sure you type their name correctly.`;
        },
        timesup: (guildMember) => {
            return `
            :x: | Wake up! The time ran out.
            You didn't confirm that ${guildMember.user.tag} was the member you wanted to ban.
            `;
        }
    },
    kick: {
        selfkick: () => {
            return `:x: | Don't kick yourself!`;
        },
        kickbot: () => {
            return `:x: | If you wish to get me out of this server, please kick me manually.`;
        },
        roleHigher: () => {
            return `:x: | You cannot kick this member.`;
        },
        noBotPermission: () => {
            return `:x: | Failed in kicking that member. Make sure that I have the "Kick Members" permission!`;
        },
        kickedSuccessfully: (member, reason) => {
            return `✅ | ${member.user.tag} is now kicked. ${reason ? ` Reason: ${reason}` : ''}`;
        },
        confirmation: (guildMember) => {
            return `
Confirm that this is the right member.

> User: **<@${guildMember.id}>**
> ID: **${guildMember.id}**
> Tag: **${guildMember.user.tag}**

\`Please react with ✅ if it is correct or with ❌ if not.\``;
        },
        wrongMember: () => {
            return `:x: | Got it. Try again and make sure you type their name correctly.`;
        },
        timesup: (guildMember) => {
            return `
            :x: | Wake up! The time ran out.
            You didn't confirm that ${guildMember.user.tag} was the member you wanted to kick.
            `;
        }
    },
    mute: {
        noRolePermission: () => {
            return `I cannot complete this request, since I lack the \`MANAGE_ROLES\` permission.`;
        },
        incorrectUsage: () => {
            return `Incorrect usage. Please mention a guild member and the time you want that person to be muted. \`(eg. 10m\``;
        },
        muted: (user, duration) => {
            return `**<@${user.id}>** is now muted for **${duration}**.`;
        },
        unmuted: (user) => {
            return `**<@${user.id}>** is now unmuted.`;
        },
        notMuted: (user) => {
            return `**<@${user.id}>** is not muted.`;
        },
        noMuteRole: () => {
            return `There is no "Muted" role.`;
        }
    },
    warn: {
        warnbot: () => {
            return `:x: | You cannot warn me.`;
        },
        warnedSuccessfully: (member, reason) => {
            return `✅ | ${member.user.tag} has been warned. ${reason ? ` Reason: ${reason}` : ''}`;
        },
        confirmation: (guildMember) => {
            return `
Confirm that this is the right member.

> User: **<@${guildMember.id}>**
> ID: **${guildMember.id}**
> Tag: **${guildMember.user.tag}**

\`Please react with ✅ if it is correct or with ❌ if not.\``;
        },
        wrongMember: () => {
            return `:x: | Got it. Try again and make sure you type their name correctly.`;
        },
        timesup: (guildMember) => {
            return `
            :x: | Wake up! The time ran out.
            You didn't confirm that ${guildMember.user.tag} was the member you wanted to warn.
            `;
        },
        invaludUser: () => {
            return `Invalid member mentioned.`;
        },
        noWarns: () => {
            return `User has no warnings`;
        }
    },
    purge: {
        incorrectUsage: () => {
            return `Incorrect usage. Make sure you entered a number lower than 100.`;
        }
    },
    giveaway: {
        setup: {
            first: () => {
                return `Setting up a new giveaway...\nPlease provide a channel you want your giveaway in.\n\`You may type cancel to cancel the setup at any time during the setup,\``;
            },
            second: (channel) => {
                return `The giveaway will be happening in <#${channel.id}>. How much should the giveaway run for?\n\`Type the duration in seconds.\nYou may also type it as minutes or hours with an added m, respectively, h at the end\``;
            },
            third: () => {
                return `How many winners there should be?\n\`Please enter a number of winners.\``;
            },
            forth: () => {
                return `Last thing, what's the prize?\n\`Enter the giveaway prize.\``;
            },
            success: () => {
                return `Your giveaway has been created!`;
            },
            error: () => {
                return `An error occured. Giveaway setup was canceled.`;
            }
        },
        canceled: () => {
            return `Giveaway setup was canceled.`;
        },
        invalidChannel: () => {
            return `The channel you entered is invalid. Please enter it again.`;
        },
        invalidTime: () => {
            return `The time you entered is either too short or invalid. Please enter it again.`;
        },
        invalidWinners: () => {
            return `I can't read the number of winners you entered. Please enter it again.`;
        },
        invalidPrize: () => {
            return `The prize you entered is too long. Shorten it a bit and try again.`;
        },
        error: () => {
            return `An error occured. Giveaway setup was canceled.`;
        },
        ended: (winners) => {
            return `The giveaway ended! The winners are ${winners} .`;
        },
        noUsers: () => {
            return `No one joined the giveaway, so no winners were selected.`;
        },
        endedByUser: () => {
            return `Giveaway ended.`;
        },
        noGiveawayInChannel: () => {
            return `There is no giveaway in this channel. If I'm wrong, please retype the command and add a message id to it.`;
        },
        invalidMessageID: () => {
            return `The message ID you provided is invalid.`;
        }
    },
    invites: {
        invalid: () => {
            return `This invite is invalid.`;
        },
        info: (uses, createdAt, author) => {
            return `This invite has **${uses} uses.**\nIt was created by <@${author.id}> at **${createdAt}**.`;
        },
        rewardsDisabled: () => {
            return `Invite rewards for this guild are disabled.`;
        },
        rewardUser: (uses, reward) => {
            return `You just achieved a milestone of **${uses} invite uses!** Your award is **${reward}**.`;
        }
    },
    help: {
        description: () => {
            return `Light is a feature-rich Discord BOT with many utilities, fun and moderation facilities, and perfect for any Discord server.
            This bot was purchased from MC-Market, published by Light Development. Developed and put together by kMagic (ciprian.#6142).
            For any issue with this resource, please contact us at the Light Development server (found in resource page).
            Thank you for your purchase!`;
        },
        failed: () => {
            return `Failed to send you feedback of the help command. Are your DM's from this server enabled?`;
        },
        sent: () => {
            return `📥 | Check your DMs!`;
        }
    },
    LightStartup: () => {
        // ascii art with ansi colors for light's startup. you can change it if you really want to.
        return `[107;40m[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;234m.[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;234m.[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;234m.[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;234m.[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;234m.[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;234m.[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;234m.[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;236m,[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;237m,[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;173m#[38;5;173m#[38;5;209m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;209m#[38;5;131m/[38;5;235m.[38;5;232m [38;5;016m [38;5;232m [38;5;235m.[38;5;131m/[38;5;209m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;173m#[38;5;209m#[38;5;173m#[38;5;173m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;173m#[38;5;209m#[38;5;209m#[38;5;209m#[38;5;209m#[38;5;209m#[38;5;209m#[38;5;209m#[38;5;095m*[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;095m*[38;5;209m#[38;5;209m#[38;5;209m#[38;5;209m#[38;5;209m#[38;5;209m#[38;5;209m#[38;5;173m#[38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;174m#[38;5;210m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;016m 
            [38;5;016m [38;5;237m,[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;238m,
            [38;5;016m [38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#
            [38;5;016m [38;5;237m,[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;237m,
            [38;5;016m [38;5;016m [38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;174m#[38;5;210m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;210m#[38;5;174m#[38;5;232m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;232m [38;5;174m#[38;5;210m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;210m#[38;5;174m#[38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;174m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;131m/[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;131m/[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;174m#[38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;132m([38;5;238m,[38;5;233m [38;5;016m [38;5;233m [38;5;238m,[38;5;132m([38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;210m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;234m.[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;174m#[38;5;234m.[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;168m#[38;5;204m#[38;5;204m#[38;5;210m#[38;5;204m#[38;5;204m#[38;5;204m#[38;5;204m#[38;5;204m#[38;5;204m#[38;5;204m#[38;5;204m#[38;5;204m#[38;5;204m#[38;5;168m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;232m [38;5;205m#[38;5;205m#[38;5;205m#[38;5;205m#[38;5;205m#[38;5;205m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;205m#[38;5;205m#[38;5;205m#[38;5;205m#[38;5;205m#[38;5;205m#[38;5;232m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;232m [38;5;169m#[38;5;169m#[38;5;169m#[38;5;205m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;169m#[38;5;169m#[38;5;205m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;168m([38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;168m([38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;239m*[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;205m#[38;5;239m,[38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;233m [38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;169m#[38;5;233m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;233m [38;5;235m.[38;5;236m.[38;5;236m.[38;5;235m.[38;5;233m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m [38;5;016m 
            [0m`;
    }
};