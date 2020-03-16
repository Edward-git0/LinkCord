const {RichEmbed} = require('discord.js')
module.exports = async (client, message) => {
    const entry = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE'
    }).then(audit => audit.entries.first())
	let user = ""
    if (entry.extra.channel.id === message.channel.id &&
        (entry.target.id === message.author.id) &&
        (entry.createdTimestamp > (Date.now() - 5000)) &&
        (entry.extra.count >= 1)) {
		user = entry.executor
    } else {
		user = message.author
	}
	
	if(user.id === message.author.id) {
	const logger1 = new RichEmbed()
	.setTitle(`Logs ~ Message Delete`)
	.setDescription(`${message.author}'s message was deleted in ${message.channel.toString()} \n\n` + `**Message:** \n` + '```' + message + '```')
	.setFooter(`This user deleted their own message. There is no audit log entry.`)
	.setColor('BLURPLE')
	.setTimestamp();

	client.log.send(logger1)
	} else {
		const logger2 = new RichEmbed()
	.setTitle(`Logs ~ Message Delete`)
	.setDescription(`There was a ${message.author.tag}'s message was deleted in ${message.channel.toString()} by ${user.tag}\n\n` + `**Message:** \n` + '```' + message + '```')
	.setFooter(`LinkCord audit logs`)
	.setColor('BLURPLE')
	.setTimestamp();

	client.log.send(logger2)
	}
};