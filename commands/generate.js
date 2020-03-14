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
			}).then(collector => {
				console.log(collector.content)
				if(collector.content.toLowerCase() === 'coins') {
					call.message.channel.send(randomize('A0', 6))
					call.message.channel.send(`This code will be valid for 45 days.`)
				}
				if(collector.content.toLowerCase() === 'shopitem') {
					call.message.channel.send(randomize('A0', 6))
					call.message.channel.send(`This code will be valid for 45 days.`)
				} else {
					call.message.channel.send(`Invalid choice. Please re-run the command with the proper choice response.`)
				}
			}).catch(error => {
				call.message.channel.send(`Invalid choice. Please re-run the command with the proper choice response.`)
			})
		} catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
