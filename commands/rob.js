const Discord = require('discord.js');
module.exports = {
    id: 'rob',
    aliases: [],
    desc: 'Allows you to rob another user of their LinkCoins. You must have at least 25 LinkCoins to rob someone.',
    category: 'public',
    enabled: true, 
    channels: 'guild',
    exec: async (call) => {
        try {
		let target = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));
		let linkcoin = call.client.emojis.get('670675326837194782')
		//Check if there is no target
		if(!target)
			return call.message.channel.send(`You have to find someone to rob first!`)
		
		//check If the user is robbing themselves.
		if(target.id === call.message.author.id)
			return call.message.channel.send(`It's illogical to rob yourself. Why would you even consider that?`)
		//check if the user they are robbing is a bot
		if(target.user.bot) 
			return call.message.channel.send(`Bots have no money for you, move on!`)
		
		//Define the keys for the database so I don't have to write them over and over and over and over and over and over and over and over and over and over and over
		let mKey = `${call.message.author.id}-${call.message.guild.id}`
		let tKey = `${target.id}-${call.message.guild.id}`
		let targetBalance;
		let prob;
		let poss = Math.random()
		let looted;
		
		// Try to get the targets balance from the database, if that fails they don't have any userdata and must chat before being robbed.
		try {
			targetBalance = call.client.econData.get(tKey, 'linkCoins')
		} catch (error) {
			return call.message.channel.send(`That user has nothing to rob! Tell them to chat a little.`)
		}

		if(targetBalance < 50)
			return call.message.channel.send(`Its not worth it.. Move on.`)
		//Calculate prob if they arent members 
		prob = 0.90
		if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === '💎 Diamond').id)) {
			prob = 0.85
		}
		if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === '💎 Diamond+').id)) {
			prob = 0.75
		}

		let message = await call.message.channel.send(`You are beating up ${target} for their money..`)
		let failedResponses = [
			`${target.user.username} gave you a purple-nurple and sprayed you with pepper-spray`,
			`${target.user.username} kicked you where the sun doesn't shine`,
			`${target.user.username} gave you a wedgie and sprayed you with a lemon!`,
			`${target.user.username} called the police and they fined you!`,
			`${target.user.username} hit you over the head with a garbage can lid and kicked where the sun doesn't shine!`,
			`${target.user.username} hit you over the head with a garbage can lid`,
			`${target.user.username} shoved a raccoon in your face!`,
			`${target.user.username} hit you with their fanny pack!`,
			`${target.user.username} punched you and knocked you out`,
			`${target.user.username} Roundhouse kicked you right in the face!`,
			`${target.user.username} pushed you into a garbage can!`,
			`${target.user.username} shoved your face into a brick wall`,
			`${target.user.username} shoved your face into a pie!`

		]
		if(poss < prob) {
			let failed = new Discord.RichEmbed()
			.setTitle(`${failedResponses[Math.floor(Math.random() * failedResponses.length)]}`)
			.setDescription(`You tried to rob ${target}, but instead you lost \`50\` ${linkcoin}`)
			.setFooter(`LinkCord Economy ~ You lost a robbery`)
			.setTimestamp()
			.setColor('RED')
			message.edit(failed)
		} else {
			looted = Math.floor(Math.random() * (150 - 75) + 75);
			if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === '💎 Diamond').id)) {
				looted = Math.floor(Math.random() * (300 - 100) + 100)
			}
			if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === '💎 Diamond+').id)) {
				looted = Math.floor(Math.random() * (850 - 400) + 400);
			}
			let won = new Discord.RichEmbed()
			.setTitle(`You won the robbery!`)
			.setTitle(`You were able to loot \`${looted}\` ${linkcoin} from ${target}!`)
			.setFooter(`Want more loot? run ${call.prefixUsed}store and buy Diamond!`)
			.setColor('RED')
			.setThumbnail('https://giphy.com/gifs/swag-money-make-it-rain-2u11zpzwyMTy8')
			message.edit(won)
			
		}

        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
