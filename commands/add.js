const Discord = require('discord.js');
module.exports = {
    id: 'add',
    aliases: ['baladd', 'balanceadd', 'configadduserbal'],
    channels: 'guild',
    exec: (call) => {
		try {
		if(call.message.member.roles.find(r => r.name === "Event Host") || call.message.member.roles.find(r => r.name = 'Administrator')) {
		let target = call.message.mentions.users.first()
		if(!target) return call.message.channel.send(`Mention a user!`)
		let prevBal = call.client.econData.get(`${target.id}-${call.message.guild.id}`, 'linkCoins');
		let toAdd = call.args[1];
		if (!toAdd || isNaN(toAdd)) return call.message.channel.send("Please enter a **valid** amount of money. :x:");
		let finalToAdd = parseInt(toAdd)
		call.client.econData.math(`${target.id}-${call.message.guild.id}`, '+', finalToAdd, 'linkCoins');
		let newBal = call.client.econData.get(`${target.id}-${call.message.guild.id}`, 'linkCoins')
		call.message.channel.send(`⚒️ I am updating the value in the database, please wait for the server to respond.`).then(msg => {
			const embed = new Discord.RichEmbed()
			.setTitle('Database edit success')
			.setDescription(`**I have successufully updated this users \`econData.linkCoins\` data.** \nTheir old balance was **${prevBal}** \nTheir new balance is **${newBal}**`)
			.setFooter(`LinkCord Adminstration Module - Commands run on this module are logged`)
			.setTimestamp();
			msg.edit(embed)
		});
	}
	else {
		call.message.channel.send(`You can't run this command!`)
	}
} catch (error) {
			call.message.channel.send(`Oops! That was an error! This issue has been reported to the adminstration team.`)
			console.log(error)	
}
	}
};