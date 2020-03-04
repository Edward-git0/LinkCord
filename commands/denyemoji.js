const Discord = require('discord.js');
module.exports = {
    id: 'denyemoji',
    aliases: ['de'],
    channels: 'guild',
    exec: async (call) => {
        try {
		
			if(!call.message.member.hasPermission('MANAGE_MESSAGES'))
				return;

			let id = call.args[0];
			let reason = call.args.slice(1).join(' ');

			if(!id)
				return call.message.reply(`Please type out the user who requested the emoji.`)
			if(!reason)
				return call.message.reply(`Please reply with the reason for why the emoji should declined.`)
			
			
			let searchForEmoji = call.client.tempData.find(filter => {
				return filter.userID === id
			});

			if(!searchForEmoji)
				return call.message.reply(`I couldn't find a user who sent an emoji in with that ID.`)
			if(searchForEmoji.size === 0)
				return call.message.reply(`I couldn't find a user who sent an emoji with that ID.`)
			
			call.client.channels.get('659149534894489639').send(`**${call.message.author.tag}** denied an emoji for user *${searchForEmoji.userName}* for reason ${reason}`)
			
			call.client.tempData.delete(searchForEmoji.userID)
			call.client.econData.math(`${searchForEmoji.userID}-${call.message.guild.id}`, '+', 5000, 'linkCoins')
			call.client.users.get(searchForEmoji.userID).send(`Your emoji (${searchForEmoji.emojiName}) was denied for __${reason}__`)
			call.message.react('👍')
        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
