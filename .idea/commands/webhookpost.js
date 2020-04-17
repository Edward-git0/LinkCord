const Discord = require('discord.js');
module.exports = {
    id: 'webhookpost',
    aliases: ['whp', 'hook'],
    desc: 'Allows admins to chat via a webhook',
    category: 'developer',
    enabled: true, 
    channels: 'guild',
    exec: async (call) => {
        try {
			call.message.delete()
			if (call.message.member.hasPermission('MANAGE_MESSAGES')) {
				let message = call.args.join(' ')
				if(!message)
					return call.message.channel.send(`Supply a message!`)
				let channelhooks = await call.message.channel.fetchWebhooks();

				let webhook = channelhooks.find(w => w.name === call.message.author.username)

				if(!webhook) {
					webhook = await call.message.channel.createWebhook(call.message.author.username, call.message.author.avatarURL, ['They are chatting via a webhook'])
				}

				webhook.send(message)

				webhook.delete(['The user is no longer using the hook.'])


			} else {
				return;
			}
        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
