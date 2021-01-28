const sm = require('string-similarity');

module.exports = {
    enabled: true,
    name: 'kick',
    aliases: 'serverkick',
    description: 'Kicks a user from the server.',
    expectedArgs: '<@Member> or <Username>' ,
    minArgs: 1,
    maxArgs: null,
    permissions: ['KICK_MEMBERS'],
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

			let msg = await message.channel.send(client.language.kick.confirmation(guildMember));

			await msg.react(yes);
			await msg.react(no);

			let filter = (reaction, user) => user.id !== client.user.id && (reaction.emoji.name === yes || reaction.emoji.name === no) && user.id === message.author.id;
			let collector = msg.createReactionCollector(filter, {time: 60000});
			collector.on('collect', async (collected) => {
				var isYes = collected.emoji.name === yes;
                var isNo = collected.emoji.name === no;
                
                switch(true) {
                    case isNo:
						message.channel.send(client.language.kick.wrongMember());
						collector.stop();
                        break;
                    case isYes:
                        const options = {};
					    if (reason) options.reason = reason;

					    await message.guild.members.kick(guildMember, options);
						message.channel.send(client.language.kick.kickedSuccessfully(guildMember, reason));
						collector.stop();
                        break;
                }
			});

			collector.on('end', (_collected, reason) => {
				if(reason === "time")
				message.channel.send(client.language.kick.timesup(guildMember));
				return msg.reactions.removeAll();
			});
		}
    }
};