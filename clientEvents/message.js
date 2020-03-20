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
		if(message.member.roles.has(message.guild.roles.find(r => r.name === 'Administrator').id))
			return;
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

  if(message.author.bot)
		return;

	
	if(message.channel.type === 'text') {
		client.econData.ensure(`${message.author.id}-${message.guild.id}`, {
			userID: message.author.id, 
			guildID: message.guild.id,
			linkCoins: 175,
			lastDaily: "0",
			purchases: [],
		});
		client.cooldownData.ensure(`${message.author.id}-${message.guild.id}`, {
			userID: message.author.id, 
			activeCoolGuildID: message.guild.id,
			commandsWithActiveCool: [], 
			commandHashWithActiveCool: [], 
			coolPardon: false,
		});
		client.systemData.ensure(message.author.id, {
			userID: message.author.id, 
			userBlocked: false, 
			grantEvalAccess: false, 
			grantEconAdmin: false, 
			grantSuperPerms: false, 
			grantEdwardIsADuck: false, 
			grantDevCodeAccess: false, 
			grantCodeExportAccess: false
		});
		client.guildData.ensure(message.guild.id, {
			lastcase: 0,
			cases: [],
			playing: false,
			queue: []
		});
	}

	if(client.econData.get(`${message.author.id}-${message.guild.id}`, 'linkCoins') < 0) {
		client.econData.set(`${message.author.id}-${message.guild.id}`, 0, 'linkCoins')
	}
};