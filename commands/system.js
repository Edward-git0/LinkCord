const Discord = require('discord.js');
module.exports = {
    id: 'system',
    aliases: [],
    desc: 'The developer to edit the configuration of the bot.',
    category: 'developer',
    enabled: true, 
    channels: 'guild',
    exec: (call) => {
        try {
		
			
		if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === 'Administrator').id)) {
			let principal = call.args[0];
			if(!principal)
				return call.message.react('687791419766734930')
			if(principal.toLowerCase() === 'rulesreactionmessageid') {
				let id = call.args[1];
				if(!id)
					return call.message.react('687791419766734930')
				
				call.client.systemData.set('system', id, 'rulesReactionMessageID')
				call.message.channel.send(`Done! :)`)
			} else if (principal.toLowerCase() === 'devcordreactionmessageid') {
				let id = call.args[1];
				if(!id)
					return call.message.react('687791419766734930')
				
				call.client.systemData.set('system', id, 'devCordReactionMessageid')
				call.message.channel.send(`Done! :)`)
			} else if (principal.toLowerCase() === 'pingablereactionmessageid') {
				let id = call.args[1];
				if(!id)
					return call.message.react('687791419766734930')
				
				call.client.systemData.set('system', id, 'pingableReactionMessageID')
				call.message.channel.send(`Done! :)`)
			} else if (principal.toLowerCase() === 'gamecordreactionmessageid') {
				let id = call.args[1];
				if(!id)
					return call.message.react('687791419766734930')
				
				call.client.systemData.set('system', id, 'gameCordReactionMessageID')
				call.message.channel.send(`Done! :)`)
			}
		} 
        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
