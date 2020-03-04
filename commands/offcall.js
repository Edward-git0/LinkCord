const Discord = require('discord.js');
const ms = require('ms')
module.exports = {
    id: 'offcall',
    aliases: [],
    channels: 'guild',
    exec: async (call) => {
        try {
		if(!call.message.member.hasPermission('MANAGE_MESSAGES'))
			return;
		let role = call.message.guild.roles.get('684863416615436303')
		

		call.message.member.removeRole(role.id, ['They are now off call.'])

		call.message.reply('❗ You are now off call.')
		call.client.channels.get('684869290947772424').send(`**${call.message.author.tag}** is now off-call`)

        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
