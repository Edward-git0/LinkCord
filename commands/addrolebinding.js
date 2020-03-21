const Discord = require('discord.js');
module.exports = {
    id: 'addrolebinding',
    aliases: ['arb', 'rolebinding'],
    desc: 'Allows admins to add roles to the roles menu.',
    category: 'developer',
    enabled: true, 
    channels: 'guild',
    exec: async (call) => {
        try {
			if(!call.message.member.hasPermission('MANAGE_GUILD'))
				return;
			const roleName = await call.prompt(`Name to display?`);
			const emoji = await call.prompt(`Emoji? \n**No custom emojis at this time**`)
			const roleID = await call.prompt(`ID?`)
			const cat = await call.prompt(`What category should this fall under? Your valid voices are \`gamecord, devcord, pingable\``, {
				filter: ['gamecord', 'devcord', 'pingable']
			})
			const boolEnabled = await call.prompt(`Available?`)



			call.client.matchableRoles.set(roleName.content, {
				name: roleName.content,
				cat: cat.content, 
				roleToAdd: roleID.content,
				enabled: boolEnabled.content,
				emoji: emoji.content
			})
			call.message.channel.send('Saved.')
			call.message.channel.send(`Updating messages in roles channel.`)

			let channel = call.message.guild.channels.find(c => c.name === 'roles')
			let category = ''
			if(cat.content.toLowerCase() === 'gamecord') category === 'gameCordReactionMessageID'
			if(cat.content.toLowerCase() === 'devcord') category === 'devCordReactionMessageID'
			if(cat.content.toLowerCase() === 'pingable') category === 'pingableReactionMessageID'
			let messageID = call.client.systemData.get('system', category)
			if(!messageID)
				return;
			let message = await channel.fetchMessage(messageID)

			let desc = message.embeds[0].description

			desc += `${emoji}: ${emoji.name}`

			let embed = new Discord.RichEmbed()
			.setTitle(message.embeds[0].title)
			.setDescription(desc)
			.setThumbnail(call.message.guild.iconURL)
			.setColor(`BLURPLE`)
			message.edit(embed)
			message.react(emoji.content)
			
		} catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
