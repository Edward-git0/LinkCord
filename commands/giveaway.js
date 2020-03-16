const Discord = require('discord.js');
module.exports = {
    id: 'giveaway',
    aliases: ['rungiveaway', 'g'],
    desc: 'Allows staff to runs giveaways.',
    category: 'staff',
    enabled: true, 
    channels: 'guild',
    exec: (call) => {
        try {
        if(call.message.member.roles.map(r => r.name).has('Administrator') || call.message.member.roles.map(r => r.name).has('Event Host')) {
			
		} else {
			return;
		}
        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
