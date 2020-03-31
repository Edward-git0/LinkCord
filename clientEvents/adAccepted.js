const Discord = require('discord.js');
module.exports = (client, adID) => {

	let ad = client.ads.find(a => {
		return a.status === 'waiting' && a.adID === adID
	});
	console.log('got 9')
	let adChannel = client.guilds.get(ad.advertisementGuildID).channels.find(c => c.name === 'adverts');
	let user = client.users.get(ad.applyingUserID)

	let embed = new Discord.RichEmbed()
	.setTitle(ad.embedTitle)
	.setDescription(ad.embedBody)
	.setColor('BLURPLE')
    .setFooter(`Submitted by ${ad.applyingUserTag}`)
	.setImage(ad.embedImage)
	console.log('got 19')
	adChannel.send(embed)
}