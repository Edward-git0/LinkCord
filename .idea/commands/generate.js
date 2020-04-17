const Discord = require('discord.js');
const randomize = require('randomatic')
const ms = require('ms')
module.exports = {
    id: 'generate',
    aliases: ['gen'],
    desc: 'Allows admins to generate premium codes. ',
    category: 'developer',
    enabled: true, 
    channels: 'guild',
    exec: async (call) => {
        try {
			if(!call.message.member.hasPermission('MANAGE_GUILD'))
				return;
			
			call.prompt(`What is this code for? \n*Valid answers are coins, shopItem*`, {
				time: ms('5m'), 
				correct: () => {
					call.prompt(`What is this code for? \n*Valid answers are coins, shopItem*`)
				},
				filter: ['coins', 'shopItem', 'shopitem']
			}).then(async collector => {
				if(collector.content.toLowerCase() === 'coins') {
					let code = await call.prompt('Code?')
					let coinValue = await call.prompt(`How many coins should be given when this code is redeemed?`)
					if(coinValue.content < 1 || isNaN(coinValue.content))
						return call.message.channel.send(`Please re-run the command with a valid amount of coins.`)
					
					call.message.channel.send(`created.`)
					call.client.tempData.set(code.content, {
						code: code.content,
						generatedBy: call.message.author.tag, 
						dataType: 'PREMIUM-CODE',
						coinsToGive: coinValue.content, 
						coins: true,
						shopItem: false, 
						generatedOn: Date.now()
					})
				}
				if(collector.content.toLowerCase() === 'shopitem') {
					call.message.channel.send(randomize('A0', 6))
					call.message.channel.send(`This code will be valid for 45 days.`)
				}
			})
		} catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
