const sm = require('string-similarity');

module.exports = {
    enabled: true,
    name: 'ban',
    aliases: 'serverban',
    description: 'Bans a user from the server.',
    expectedArgs: '<@Member> or <Username>' ,
    minArgs: 1,
    maxArgs: 2,
    permissions: ['BAN_MEMBERS'],
    requiredRoles: [],
    run: async (message, args, reason) => {
        const client = message.client;

        let member = message.mentions.members.first() || args[0];

        let yes = 'yes';
		let no = 'no';

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

			message.channel.send(client.language.ban.confirmation(guildMember));


			message.channel.awaitMessages(m => m.author.id === message.author.id, {
				max: 1,
				time: 60000,
				errors: ['time']
			})
			.then(async (collected) => {
				var isYes = collected.first().content.toUpperCase() === yes.toUpperCase();
                var isNo = collected.first().content.toUpperCase() === no.toUpperCase();
                
                switch(true) {
                    case isNo:
                        message.channel.send(client.language.ban.wrongMember());
                        break;
                    case isYes:
                        const options = {};
					    if (reason) options.reason = reason;

					    await message.guild.members.ban(guildMember, options);
                        message.channel.send(client.language.ban.bannedSuccessfully(guildMember, reason));
                        break;
                    default:
                        message.channel.send(client.language.ban.wrongAnswer());
                }
			})
			.catch(err => {
				if(err) throw err;
				return message.channel.send(client.language.ban.timesup());
			});
		}
    }
};