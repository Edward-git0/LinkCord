const ms = require('ms')
const { RichEmbed } = require('discord.js')
module.exports = async (client) => {
	client.channels.get('690660367105392721').fetchMessage(client.systemData.get('system', 'pingableReactionMessageID'))
	client.channels.get('690660367105392721').fetchMessage(client.systemData.get('system', 'devCordReactionMessageID'))
	client.channels.get('690660367105392721').fetchMessage(client.systemData.get('system', 'gameCordReactionMessageID'))



	//Check if giveaways are expired --> End them 

	client.setInterval(() => {
		client.giveaways.forEach(async g => {
			if(Date.now() > g.endDate) {
				let channel = client.channels.get(g.channel)
				let msg = await channel.fetchMessage(g.msgID)
				let reacted = msg.reactions.get('linkcord:660886312798257162').users
				
				reacted = reacted.filter(u => {
					return u.bot == false;
				})



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
					
					if(reacted.size <= g.totalWinners){
						client.giveaways.delete(msg.id)
						return msg.edit(notEnoughReacted)

					} 
					let random = reacted.random(g.totalWinners)
					let finishedEmbed = new RichEmbed()
					.setTitle(`🥳 The giveaway has now ended!🥳`)
					.setDescription(`The winners ` + `are ${random.join(', ')}`)
					.setFooter(`LinkCord giveaways`)
					channel.send(finishedEmbed)
					
					client.giveaways.delete(msg.id)
			}
		})
	}, ms('10s'));
}