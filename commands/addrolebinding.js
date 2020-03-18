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
			const roleID = await call.prompt(`ID?`)
			const boolEnabled = await call.prompt(`Available?`)
			const emoji = await call.prompt(`Emoji? \n**No custom emojis at this time**`)

			call.client.matchableRoles.set(roleName.content, {
				name: roleName.content,
				roleToAdd: roleID.content,
				enabled: boolEnabled.content,
				emoji: emoji.content
			})

			call.message.channel.bulkDelete(7)
		} catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
