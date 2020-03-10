const Discord = require('discord.js');
const ms = require('ms')
module.exports = {
    id: 'pardondailycooldown',
    aliases: ['pdc'],
	channels: 'guild',
	category: 'developer',
	enabled: true,

    desc: 'Allows administrators to pardon the daily cooldown for users who are experiencing issues.',
    exec: (call) => {
        try {
		let role = call.message.guild.roles.find(r => r.name === 'Administrator')

		if(!call.message.member.roles.has(role.id))
			return;
		let mention = call.message.mentions.users.first();
		if(!mention)
			return call.message.react('🚨')
		
		console.log(mention.id)
		let newData = call.client.econData.get(`${mention.id}-${call.message.guild.id}`, 'lastDaily') - ms('24h')
		call.client.econData.set(`${mention.id}-${call.message.guild.id}`, newData, 'lastDaily')
		call.message.channel.send(`ok`)
        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
