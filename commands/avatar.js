module.exports = {
	name: 'avatar',
	description: 'Users avatar',
	category: "general",
	execute(message, args, Discord) {
		let user = message.mentions.users.first();

		if (!user) {
		  const embed64 = new Discord.RichEmbed()
			.setDescription("**" + message.author.username + "'s Image:" + "**")
			.setImage(message.author.avatarURL)
			.setColor("BLURPLE");
	
		  return message.channel.send(embed64);
		}
	
		const embed64 = new Discord.RichEmbed()
		  .setDescription("**" + user.username + "'s Image:" + "**")
		  .setImage(user.avatarURL)
		  .setColor("BLURPLE");
	
		message.channel.send(embed64);
	},
};