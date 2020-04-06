const Discord = require('discord.js');
module.exports = {
    id: 'endgiveaway',
    aliases: ['alias array'],
    desc: 'Allows the Event Staff to end a running giveaway.',
    category: 'staff',
    enabled: true, 
    channels: 'guild',
    exec: (call) => {
        try {
		
			if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === 'Community Agent').id) || call.message.member.roles.has(call.message.guild.roles.find(r => r.name === 'Administrator').id)) {
				let providedID = call.args[0]

				if(!providedID)
					return call.message.channel.send(`Please provide a giveaway to end. (The message ID of the giveaway message.)`)
                let find = call.client.giveaways.get(providedID)
                
                if(!find || find.size === 0) 
                    return call.message.channel.send(`Unable to find that giveaway! Please make sure it's not already finished and that is the correct message ID.`)
                if(find.finished === true)
                    return call.message.channel.send(`Unable to find that giveaway! Please make sure it's not already finished and this is the correct message ID.`)
                
                call.client.emit('giveawayEnd', providedID)

                call.message.react('👍')
			}
        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
