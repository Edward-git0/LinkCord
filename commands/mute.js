const Discord = require('discord.js');
module.exports = {
	id: 'mute',
	category: 'moderator',
    aliases: ['quiet', 'shush'],
    channels: 'guild',
    exec: (call) => {
        try {
		   
			let role = call.message.guild.roles.find(r => r.name === 'Moderator');


		


        } catch (error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
};