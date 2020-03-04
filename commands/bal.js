const Discord = require('discord.js');
module.exports = {
    id: 'bal',
    aliases: ['balance', 'checkbalance', 'money', 'bank', 'linkcoins'],
    channels: 'guild',
    exec: (call) => {
        try {
			let user = call.message.mentions.users.first()

			if(!user) user = call.message.author
			let usersBalance = call.client.econData.get(`${user.id}-${call.message.guild.id}`, 'linkCoins')
			const embed = new Discord.RichEmbed()
			.setTitle(`Balance`)
			.setDescription(`You currently have **${usersBalance}**<:linkcoin:670675326837194782> \n\nYou can visit the shop for rewards by running \`,shop\``)
			.setThumbnail(user.avatarURL)
			.setColor('BLURPLE')
			call.message.channel.send(`⚒️ Please wait while I update your balance!`).then(msg => {
				msg.edit(embed)
			})
		} catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
};