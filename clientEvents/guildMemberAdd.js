const Discord = require('discord.js')

module.exports = (client, member) => {
	let channel = client.channels.get('659179304135032843')
	const welcomeembed = new Discord.RichEmbed()
    .setTitle("Welcome to LinkCord!")
    .setDescription(
      `**Hi ${member}** :wave:, welcome to our server!\n\nJust a few quick things you should know;\n:information_source: You can find most of the information you'll need in <#660644421968068628>\n:clipboard: You can find all of our rules in <#658780835763191821>\n<:linkcord:660886312798257162> We keep the community updated in <#660923343133999105> about progress regarding the server\n\n\nWe hope you enjoy your stay at LinkCord and don't hesitate to ask our staff for help if you need it! :slight_smile: `
    )
    .setTimestamp()
	.setColor("BLURPLE");
	channel.send(welcomeembed)
  }