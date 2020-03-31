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
				if(g.finished === true)
					return;
				
				client.emit('giveawayEnd', g.msgID)
			}
		})
	}, ms('10s'));
}