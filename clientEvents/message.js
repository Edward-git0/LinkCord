const Discord = require('discord.js')
module.exports = (client, message) => {

	// if (message.author.id === '443664778901061633') {
	// 	if (message.attachments.size > 0)
	// 		return message.delete()
	// }
  let messageContent = message.content.replace(`**`, '')
  messageContent = messageContent.replace(`*`, '')
  messageContent = messageContent.replace(`***`, '')
  let regx = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi
  if(regx.test(messageContent.toLowerCase().replace(/\s+/g, ''))) {
		// if(message.member.roles.has(message.guild.roles.find(r => r.name === 'Administrator').id))
		// 	return;
		message.delete();
		message.reply(`⚠️ Invite links to other servers are not permitted in this channel. Please submit an advertisement witht the \`~ad\` command. `)
		let embed = new Discord.RichEmbed()
		.setTitle('⚠️ An automoderation warning was issued')
		.setDescription(`A moderation action was taken against **${message.author.tag}** *(${message.author.id})* for their message in ${message.channel.toString()} with the content of` + '```' + message.content + '```')
		.setTimestamp()
		.setColor('YELLOW')
		.setFooter(`LinkCord Moderation ~ Warning`, message.author.avatarURL)
		client.channels.get('659149534894489639').send(embed)
  }
};