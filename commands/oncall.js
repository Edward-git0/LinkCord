const Discord = require('discord.js');
const ms = require('ms')
module.exports = {
    id: 'oncall',
	aliases: ['oc'],
	category: 'staff',
	enabled: true,
    desc: 'Allows staff to clock in and out.',
    channels: 'guild',
    exec: async (call) => {
        try {
		if(!call.message.member.hasPermission('MANAGE_MESSAGES'))
			return;
		let role = call.message.guild.roles.get('684863416615436303')
		

		
		let thisPrompt = await call.prompt(`When you are on call, you are responsible for **anything** that happens in the chats. You must be attentive and ready to handle anything to happen in the general chats. Do you agree? \n*Valid responses are yes, no*`, {
			time: ms('5m'),
			filter: ['yes', 'no']
		});

		if(thisPrompt.content.toLowerCase() === 'no')
			return;
		call.message.member.addRole(role.id, ['They are now on call.'])

		call.message.reply('❗ You are now on call.')
		call.client.channels.get('684869290947772424').send(`**${call.message.author.tag}** is now on-call`)

        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
