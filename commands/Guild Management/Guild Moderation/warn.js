const sm = require('string-similarity');
const Data = require('../../../data/Data');
const moment = require("moment");

module.exports = {
    enabled: true,
    name: 'warn',
    aliases: [],
    description: 'Warn a guild member.',
    expectedArgs: '<@Member or Username> [reason]',
    minArgs: 1,
    maxArgs: null,
    permissions: ['MANAGE_MESSAGES'],
    requiredRoles: [],
    run: async (message, args) => {
        const client = message.client;
        var member = message.mentions.members.first() || args[0];

        const reason = args.slice(1).join(" ");

        let yes = '✅';
        let no = '❌';
        
        var warnid = Math.random().toString(36).substr(2, 5);

        async function getMember(arguments) {
			let members = [];
	  		let indexes = [];

			message.guild.members.cache.forEach(function(member) {
				members.push(member.user.username);
				indexes.push(member.id);
			});

			let match = sm.findBestMatch(arguments, members);
			let username = match.bestMatch.target;

			let member = message.guild.members.cache.get(indexes[members.indexOf(username)]);
			let guildMember = await message.guild.members.fetch(member) || null;
			return guildMember;
        }

        if(typeof member !== "string") {
            if (member.id === client.user.id) return message.channel.send(client.language.warn.warnbot());

            await Data.setWarn(member.id, message.guild.id, reason, moment(), warnid);
            
            try {
                let channel = message.guild.channels.cache.get(await Data.getWarnsChannel(message.guild.id));
                channel.send(client.language.warnlogs.warn(message.author, member, reason, warnid));
            } catch(e) {
                // ignore
            }

			return message.channel.send(client.language.warn.warnedSuccessfully(member, reason));
        } else {
            const guildMember = await getMember(member);

			if (guildMember.id === client.user.id) return message.channel.send(client.language.warn.warnbot());
        

            let msg = await message.channel.send(client.language.warn.confirmation(guildMember));

			await msg.react(yes);
			await msg.react(no);

			let filter = (reaction, user) => user.id !== client.user.id && (reaction.emoji.name === yes || reaction.emoji.name === no) && user.id === message.author.id;
			let collector = msg.createReactionCollector(filter, {time: 60000});
			
			collector.on('collect', async (collected) => {
				var isYes = collected.emoji.name === yes;
                var isNo = collected.emoji.name === no;
                
                switch(true) {
                    case isNo:
						message.channel.send(client.language.warn.wrongMember());
						collector.stop();
                        break;
                    case isYes:
                        await Data.setWarn(guildMember.id, message.guild.id, reason, moment(), warnid);

                        try {
                            let channel = message.guild.channels.cache.get(await Data.getWarnsChannel(message.guild.id));
                            channel.send(client.language.warnlogs.warn(message.author, guildMember, reason, warnid));
                        } catch(e) {
                            // ignore
                        }

						message.channel.send(client.language.warn.warnedSuccessfully(guildMember, reason));
						collector.stop();
                        break;
                }
			});

			collector.on('end', (_collected, reason) => {
				if(reason === "time")
				message.channel.send(client.language.warn.timesup(guildMember));
				return msg.reactions.removeAll();
			});
		}

    }
};