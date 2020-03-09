const Discord = require('discord.js');
module.exports = {
    id: 'approveemoji',
	aliases: ['ae'],
	category: 'staff',
	enabled: true,
    channels: 'guild',
    exec: (call) => {
        try {
		
			if(!call.message.member.hasPermission('MANAGE_MESSAGES'))
				return;

			let id = call.args[0];

			if(!id)
				return call.message.reply(`Please type out the user who requested the emoji.`)
			
			
			let searchForEmoji = call.client.tempData.find(filter => {
				return filter.userID === id
			});

			if(!searchForEmoji)
				return call.message.reply(`I couldn't find a user who sent an emoji in with that ID.`)
			if(searchForEmoji.size === 0)
				return call.message.reply(`I couldn't find a user who sent an emoji with that ID.`)
			
			call.client.channels.get('659149534894489639').send(`**${call.message.author.tag}** approved an emoji for user *${searchForEmoji.userName}*`)
			
			call.message.guild.createEmoji(searchForEmoji.imageURL, searchForEmoji.emojiName, [], [`${call.message.author.username} approving ${searchForEmoji.userName}'s emoji`])
			call.client.tempData.delete(searchForEmoji.userID)

			call.client.users.get(searchForEmoji.userID).send(`Your emoji (${searchForEmoji.emojiName}) was approved! You can now use it in chat!`)
			call.message.react('👍')
        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
