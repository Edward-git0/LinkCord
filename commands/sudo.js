const { Message } = require('discord.js');

module.exports = {
	id: 'sudo',
	category: 'developer',
	enabled: true,
	desc: 'Makes the bot think the user sent the message (with the content specified) to the current channel.',
	exec: async (call) => {
		
		if (call.message.member.hasPermission('ADMINISTRATOR')) {
			let author = call.client.users.get(((call.args[0] || '').match(/\d+/) || [])[0]);
			if (author != null) {
				let content = call.message.content.substring(call.prefixUsed.length).trim().substring(5 + call.args[0].length).trim();
				if (content) {
					await call.message.guild.fetchMember(author);
					call.client.emit('message', new Message(call.message.channel, {
						content,
						author,
						pinned: false,
						tts: false,
						embeds: [],
						attachments: [],
						timestamp: Date.now()
					}, call.client));
				} else {
					call.message.channel.send('Invalid content. e.g. `,sudo @user ,ping`');
				}
			} else {
				call.message.channel.send('Invalid user to sudo. e.g. `,sudo @user ,ping`');
			}
		}
	}
};