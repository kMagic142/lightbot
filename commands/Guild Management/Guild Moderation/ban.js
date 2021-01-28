const sm = require('string-similarity');

module.exports = {
    enabled: true,
    name: 'ban',
    aliases: 'serverban',
    description: 'Bans a user from the server.',
    expectedArgs: '<@Member> or <Username>' ,
    minArgs: 1,
    maxArgs: null,
    permissions: ['BAN_MEMBERS'],
    requiredRoles: [],
    run: async (message, args, reason) => {
        const client = message.client;

        let member = message.mentions.members.first() || args[0];

        let yes = '✅';
		let no = '❌';

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
			if (member.id === message.author.id) return message.channel.send(client.language.ban.selfban());
			if (member.id === client.user.id) return message.channel.send(client.language.ban.banbot());

			if (member.roles.highest.position >= message.member.roles.highest.position) return message.channek.send(client.language.ban.roleHigher());
			if (!member.bannable) return message.channel.send(client.language.ban.noBotPermission());
			

			const options = {};
			if (reason) options.reason = reason;

			await message.guild.members.ban(member, options);
			return message.channel.send(client.language.ban.bannedSuccessfully(member, reason));
		} else {
			const guildMember = await getMember(member);

			if (guildMember.id === message.author.id) return message.channel.send(client.language.ban.selfban());
			if (guildMember.id === client.user.id) return message.channel.send(client.language.ban.banbot());

			let msg = await message.channel.send(client.language.ban.confirmation(guildMember));

			await msg.react(yes);
			await msg.react(no);

			let filter = (reaction, user) => user.id !== client.user.id && (reaction.emoji.name === yes || reaction.emoji.name === no) && user.id === message.author.id;
			let collector = msg.createReactionCollector(filter, {time: 60000});
			
			collector.on('collect', async (collected) => {
				var isYes = collected.emoji.name === yes;
                var isNo = collected.emoji.name === no;
                
                switch(true) {
                    case isNo:
						message.channel.send(client.language.ban.wrongMember());
						collector.stop();
                        break;
                    case isYes:
                        const options = {};
					    if (reason) options.reason = reason;

					    await message.guild.members.ban(guildMember, options);
						message.channel.send(client.language.ban.bannedSuccessfully(guildMember, reason));
						collector.stop();
                        break;
                }
			});

			collector.on('end', (_collected, reason) => {
				if(reason === "time")
				message.channel.send(client.language.ban.timesup(guildMember));
				return msg.reactions.removeAll();
			});
		}
    }
};