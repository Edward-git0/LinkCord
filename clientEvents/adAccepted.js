const Discord = require('discord.js');
module.exports = (client, adID) => {

	let ad = client.ads.find(a => {
		return a.status === 'waiting' && a.adID === adID
	});
	let adChannel = client.guilds.get(ad.advertisementGuildID).channels.find(c => c.name === 'adverts');
	let user = client.users.get(ad.applyingUserID)

	let embed = new Discord.RichEmbed()
	.setTitle(ad.embedTitle)
	.setDescription(ad.embedBody)
	.setColor('BLURPLE')
    .setFooter(`Submitted by ${ad.applyingUserTag}`)
	.setImage(ad.embedImage)
	adChannel.send(embed)

	client.ads.set(`${ad.adID}-${ad.applyingUserID}`, 'declined', 'status')
	user.send(`**Congrats your advertisement has been posted in LinkCord!** You can view it over in ${adChannel} \nJust to refresh, you posted an advertisement with an ID of ` + '```' + ad.adID + '```' + '\nWith a title of ' + '```' + ad.embedTitle + '```' + '\n If you would like your advertisement removed, please contact a Community Agent.')
}