const moment = require('moment');
moment.suppressDeprecationWarnings = true;
const { MessageEmbed } = require('discord.js');

module.exports = async (channel, time, winners, prize, creator, client) => {
    let displayTime = moment(new Date())
    .utc()
    .add(await time, 's')
    .format("dddd, MMMM Do YYYY, h:mm A");
    time = moment().add(await time, 's');

    let giveaway = new MessageEmbed()
    .setAuthor(`‼️ Giveaway Time ‼️`, channel.guild.iconURL())
    .setDescription(prize + `\n\nEnds ${displayTime} UTC\nHosted by: <@${creator.id}>`)
    .setColor(client.embedColor)
    .setFooter(`${winners} winners | React with 🎁 to enter.`);

    let msg = await channel.send(giveaway);
    msg.react('🎁');

    time = moment(time).valueOf() - new Date().getTime();

    const filter = (reaction) => reaction.emoji.name === '🎁';
    const collector = msg.createReactionCollector(filter);

    var timeout = setTimeout(() => collector.stop(), time);
            
    await collector.on('end', async (collected) => 
    {
        collected = collected.first().users.cache.array().filter(u => !u.bot);
        if(collected.length < 1) 
        {
            giveaway = new MessageEmbed()
            .setAuthor(`‼️ Giveaway ENDED ‼️`, channel.guild.iconURL())
            .setDescription(prize + `\n\nWinners: None\nHosted by: <@${creator.id}>`)
            .setColor(client.embedColor)
            .setFooter(`Ended at ${moment().utc().format("dddd, MMMM Do YYYY, h:mm A [UTC]")}.`);

            msg.edit(giveaway);
            return channel.send(client.language.giveaway.noUsers());
        }

        let chosenWinners = [];

        for(let i = 0; i < winners; i++) 
        {
            chosenWinners.push(collected[Math.floor(Math.random() * collected.length)].id);
        }

        winners = "";

        chosenWinners.forEach(winner => 
            {
            winners += `<@${winner}>, `;
            }
        );

        if(winners.endsWith(", ")) 
        {
            winners = winners.substring(0, winners.length - 2);
        }

        giveaway = new MessageEmbed()
        .setAuthor(`‼️ Giveaway ENDED ‼️`, channel.guild.iconURL())
        .setDescription(prize + `\n\nWinners: ${winners}\nHosted by: <@${creator.id}>`)
        .setColor(client.embedColor)
        .setFooter(`Ended at ${moment(moment(), "dddd MMM YYYY hh:mm A")}.`);

        await msg.edit(giveaway);

        return channel.send(client.language.giveaway.ended(winners));

    });

    client.giveaways.set(msg.id, {
        channel: channel,
        time: time,
        winners: winners,
        prize: prize,
        creator: creator,
        client: client,
        timeout: timeout
    });

};