const sm = require('string-similarity');

module.exports = {
    enabled: true,
    name: 'kick',
    aliases: 'serverkick',
    description: 'Kicks a user from the server.',
    expectedArgs: '<@Member> or <Username>' ,
    minArgs: 1,
    maxArgs: 2,
    permissions: ['KICK_MEMBERS'],
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
			if (member.id === message.author.id) return message.channel.send(client.language.kick.selfkick());
			if (member.id === client.user.id) return message.channel.send(client.language.kick.kickbot());

			if (member.roles.highest.position >= message.member.roles.highest.position) return message.channek.send(client.language.kick.roleHigher());
			if (!member.kickable) return message.channel.send(client.language.kick.noBotPermission());
			

			const options = {};
			if (reason) options.reason = reason;

			await message.guild.members.kick(member, options);
			return message.channel.send(client.language.kick.kickedSuccessfully(member, reason));
		} else {
			const guildMember = await getMember(member);

			if (guildMember.id === message.author.id) return message.channel.send(client.language.kick.selfkick());
			if (guildMember.id === client.user.id) return message.channel.send(client.language.kick.kickbot());

			message.channel.send(client.language.kick.confirmation(guildMember));


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
                        message.channel.send(client.language.kick.wrongMember());
                        break;
                    case isYes:
                        const options = {};
					    if (reason) options.reason = reason;

					    await message.guild.members.kick(guildMember, options);
                        message.channel.send(client.language.kick.kickedSuccessfully(guildMember, reason));
                        break;
                    default:
                        message.channel.send(client.language.kick.wrongAnswer());
                }
			})
			.catch(err => {
				if(err) throw err;
				return message.channel.send(client.language.kick.timesup());
			});
		}
    }
};