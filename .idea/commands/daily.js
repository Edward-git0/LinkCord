const Discord = require('discord.js');
const ms = require('ms')
const moment = require('moment')
module.exports = {
	id: 'daily',
	category: 'public',
	enabled: true,
	desc: 'Allows you to collect your daily bonus available every 24 hours.',
    aliases: ['d', 'dailymoney', 'givememymoney'],
    channels: 'daily',
    exec: async (call) => {
        try {
			let key = `${call.message.author.id}-${call.message.guild.id}`
			let linkCoin = call.client.emojis.get('670675326837194782')
			let oldBalance = call.client.econData.get(key, 'linkCoins');
			let cooldownExpire = call.client.econData.get(`${call.message.author.id}-${call.message.guild.id}`, 'lastDaily')
			if (Date.now() < cooldownExpire + ms('24h'))
				return call.message.reply(`You've used the daily command within the last 24 hours. Please wait until **${moment(cooldownExpire + ms('24h')).format('MMMM Do YYYY, h:mm:ss a')}** before using the command again.`)
			
			let boomer = await call.message.channel.send(`Depositing your daily bonus.`)

			call.client.econData.math(key, '+', 120, 'linkCoins')
			let newBalance = call.client.econData.get(key, 'linkCoins')
			call.client.econData.set(key, Date.now(), 'lastDaily')
			let embed = new Discord.RichEmbed()
			.setTitle(`Daily Bonus`)
			.setFooter(`${call.message.guild.name} Economy Module`, call.message.author.avatarURL)
			.setDescription(`🎉 **You received your 120 Daily${linkCoin}!** 🎉 \n\n**Your old balance was:** ${oldBalance}\n**Your new balance is:** ${newBalance}`)
			.setColor('BLURPLE')
			.setTimestamp();
			boomer.edit(embed)
		} catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
