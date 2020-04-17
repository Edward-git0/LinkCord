const Discord = require('discord.js');
module.exports = {
    id: 'pardonapplicationcooldown',
    aliases: ['pardonapp', 'apppardon'],
    category: 'developer',
    enabled: true,
    desc: 'Allows administrators to pardon the application cooldown.',
    channels: 'any',
    exec: (call) => {
        try {
			let role = call.message.guild.roles.get('658837632066912276')

			if(!call.message.member.roles.has(role.id)) return; 

			let calledMember = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));

			call.client.apps.delete(calledMember.id);

			call.message.react('👍')
		} catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
