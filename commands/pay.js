const Discord = require('discord.js');
module.exports = {
    id: 'pay',
    aliases: ['give', 'sendthemmymoney'],
    desc: 'Allows you to pay other users money from your balance.',
    category: 'public',
    enabled: true, 
    channels: 'guild',
    exec: async (call) => {
        try {
			
			let linkcoin = call.client.emojis.get('670675326837194782')
			let calledMember = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));

			if(!calledMember)
				return call.message.reply(`Please mention a user you would like to wire money to.`)
			
			let coinsToSend = call.args[1]

			if(!coinsToSend || isNaN(coinsToSend)) 
				return call.message.channel.send(`Please specify the amount you would like to wire to that person!`)
			
			// Timed wait so LinkCord looks cool :) 
			// Codeward, did you know that timed waits actually intreague people more than just running it immediately?
			let message = await call.message.channel.send(`📈 Sending the ${linkcoin}! Please give me a moment!`)

			//Check if the user has the money they want to pay.
			if(parseInt(coinsToSend) > call.client.econData.get(`${call.message.author.id}-${call.message.guild.id}`, 'linkCoins'))
				return message.edit(`Sorry, your balance is not high enough to send ${coinsToSend} ${linkcoin}`)

			//Make sure they aren't paying themselves (why this is a bad thing, idk? Ask codeward)
			if(calledMember.id === call.message.author.id)
				return message.edit(`You cannot pay yourself! *(Why would you want to do that?)*`)

			//Take the money from the person who is starting the command
			call.client.econData.math(`${call.message.author.id}-${call.message.guild.id}`, '-', parseInt(coinsToSend), 'linkCoins')

			//Give the money to the called user.
			call.client.econData.math(`${calledMember.id}-${call.message.guild.id}`, '+', parseInt(coinsToSend), 'linkCoins')

			let successEmbed = new Discord.RichEmbed()
			.setTitle(`🏦 The money has been sent! 🚚`)
			.setDescription('I have sent the amount of ```' + coinsToSend + '```' + `to the user ${calledMember} \n\nYou now have a remaining balance of ` + '```' + `${call.client.econData.get(`${call.message.author.id}-${call.message.guild.id}`, 'linkCoins')}` + '```')
			.setTimestamp()
			.setThumbnail(call.message.author.avatarURL)
			.setColor(`BLURPLE`)
			.setFooter(`LinkCoins transfer`);

			message.edit(successEmbed)
		} catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
