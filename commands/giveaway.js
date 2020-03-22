const Discord = require('discord.js');
const ms = require('ms')
const moment = require('moment')
module.exports = {
    id: 'giveaway',
    aliases: ['rungiveaway', 'g'],
    desc: 'Allows staff to runs giveaways.',
    category: 'staff',
    enabled: true, 
    channels: 'guild',
    exec: async (call) => {
        try {
        if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === 'Administrator').id) || call.message.member.roles.has(call.message.guild.roles.find(r => r.name === 'Community Agent').id)) {
            let itemPrompt = await call.prompt(`What is the item you are giving away?`)
            let winnersPrompt = await call.prompt(`How many winners should there be?`)
            let duration = await call.prompt(`How long should this last? \n*Note: This should provided in the following format: 25s, 6h, 1d, 7w*`)
            let channelPrompt = await call.prompt(`Where should this take place?`)
            let pingBool = await call.prompt(`Should I ping the Giveaway ping role for this giveaway? **Correct Answers are yes or no**`, {
                filter: ['yes', 'no'],
                correct: true
            })
            let cord = call.client.emojis.get('660886312798257162')

            let giveawayChannel = channelPrompt.mentions.channels.first()
            let winners = parseInt(winnersPrompt.content)
            if(!winners)
                return call.message.channel.send(`Pleae re-run the prompt and provide a valid number of winners (an integer)`)
            let time = ms(duration.content)
            if(!time)
                return call.message.channel.send(`Please re-run the command and provide a valid time.`)
            let toSendEmbed = new Discord.RichEmbed()
            .setTitle(`Giveaway: ${itemPrompt.content}`)
            .setDescription(`React with ${cord} to enter into this giveaway \n\nThis giveaway will have **${winners}** winner and will last until ${moment(Date.now() + time).format('MMMM Do YYYY, h:mm a')}`)
            .setFooter(`LinkCord Giveaways ~ This giveaway was started by ${call.message.author.username}`)
            .setColor('BLURPLE')
            .setTimestamp()
            if(pingBool.content.toLowerCase() === 'yes') 
                giveawayChannel.send(`<@&661242080374423562>`)
            giveawayChannel.send(toSendEmbed).then(msg => {
                msg.react(cord)

                call.client.giveaways.set(msg.id, {
                    msgID: msg.id,
                    giveawayItem: itemPrompt.content,
                    totalWinners: winners, 
                    time: time,
                    endDate: Date.now() + time,
                    channel: giveawayChannel.id,
                    created: Date.now(),
                    winners: []
                })

                call.message.channel.send(`I've created that giveaway!`)
            })
		} else {
			return;
		}
        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
