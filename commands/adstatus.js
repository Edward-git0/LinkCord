const Discord = require('discord.js');
module.exports = {
	id: 'adstatus',
	category: 'public',
	enabled: true,
    aliases: ['checkmyad', 'whereismyad', 'whatsthestatusofmyad'],
	desc: 'Allows the user to check the status of their submitted advertisement',
    channels: 'guild',
    exec: (call) => {
        try {
        
				let adToCheckID = call.args[0];
				let searchResult;
				
				if(!adToCheckID)
					return call.message.reply(`Please provide an advertisment ID. You were provided one when you submitted your advertisement`)
				let role = call.message.guild.roles.get('658837632066912276')

					if(call.message.member.roles.has(role.id)) {
							searchResult =  call.client.ads.find(found => {
							return found.adID === adToCheckID 
						});
					}
					if(!call.message.member.roles.has(role.id)) {
							searchResult =  call.client.ads.find(found => {
							return found.adID === adToCheckID && found.applyingUserID === call.message.author.id
						})
					}
				console.log(searchResult)
				if(searchResult.size === 0) 
					return call.message.reply(`I couldn't find any advertisments with that ID. \nBefore seaching again, make sure you were the one who submitted the ad.`)
				if(!searchResult)
					return call.message.reply(`I couldn't find any advertisments with that ID. \nBefore seaching again, make sure you were the one who submitted the ad.`)
				if(searchResult.status === 'approved') {
						let embed = new Discord.RichEmbed()
						.setTitle(`Your ad was approved!`)
						.setDescription(`Your ad with the ID of ${searchResult.adID} has been approved! `)
						.setFooter(`LinkCord`)
						call.message.channel.send(embed)
				}
				let embed = new Discord.RichEmbed()
				.setTitle(`Results on your advertisement (${searchResult.adID})`)
				.setDescription(`Your ad with the ID of ${searchResult.adID} has a status of \`${searchResult.status}\` \nPlease note: it could take up to 5 days for your ad to be approved.`)
				.setFooter(`LinkCord Advertisements`)
				.setColor('BLURPLE');
				call.message.channel.send(embed)


				
      } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
