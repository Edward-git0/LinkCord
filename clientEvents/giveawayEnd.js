const { RichEmbed } = require('discord.js')
module.exports = async (client, giveawayID) => {

	let g = client.giveaways.get(giveawayID)
	let channel = client.channels.get(g.channel)
				let msg = await channel.fetchMessage(g.msgID)
				let reacted = msg.reactions.get('linkcord:660886312798257162').users
				
				reacted = reacted.filter(u => {
					return u.bot == false;
				})


				console.log(reacted)
				let noReactedEmbed = new RichEmbed()
						.setTitle(`The giveaway of ${g.giveawayItem} has now ended!`)
						.setDescription(`There was **no** winner because nobody reacted!`)
						.setColor('ORANGE')
						.setFooter(`LinkCord Giveaways`)
					let notEnoughReacted = new RichEmbed()
						.setTitle(`The giveaway of ${g.giveawayItem} has now ended!`)
						.setDescription(`There was **no** winner because not enough people reacted!`)
						.setColor('ORANGE')
						.setFooter(`LinkCord Giveaways`)
					if(reacted.size === 0) {
						client.giveaways.delete(msg.id)
						return msg.edit(noReactedEmbed)
					
					}
					
					if(reacted.size < g.totalWinners){
						client.giveaways.delete(msg.id)
						return msg.edit(notEnoughReacted)

					} 
					let random = reacted.random(g.totalWinners)
					let finishedEmbed = new RichEmbed()
					.setTitle(`🥳 The giveaway has now ended!🥳`)
					.setDescription(`The winner${reacted.size == 1 ? "TBH" : "s"} ` + `are ${random.join(', ')}`)
					.setFooter(`LinkCord giveaways`)
					msg.edit(finishedEmbed)
					
					random.forEach(u => {
						client.giveaways.push(msg.id, u.id, 'winners')
						u.send(`You've just won ${g.giveawayItem} in LinkCord! Please check the giveaways channel for information on how to claim your prize.`)
					})
					client.giveaways.set(msg.id, true, 'finished')
					client.giveaways.set(msg.id, Date.now(), 'finishedOn')

}