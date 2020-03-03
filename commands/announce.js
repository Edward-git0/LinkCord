const Discord = require('discord.js');
module.exports = {
	id: 'announce',
	desc: '[PROMPT] - Prompts you to make a Discord announcement.',
	exec: async (call) => {
		//Arrays for proper choices
		const promptOptions2 = ['everyone', 'none', 'here'];

		if(!call.message.member.hasPermission('BAN_MEMBERS')) return;

		try {
			let embedTitle;
			let mention;
			let embedBody;
			let channel;
			await call.prompt(`Please mention the channel that you would like the announcement sent to.`,
				{ time: 250000 }).then((msg) => {
				channel = msg.mentions.channels.first();
			});
			await call.prompt(`Please state the mention you would like.  \n*Valid options are:* \`everyone, none, here\``,
				{ time: 25000, filter: promptOptions2 }).then((msg) => {
				if (msg.content === 'everyone') {
					mention = 'everyone';
				}
				if (msg.content === 'none') {
					mention = 'none';
				}
				if (msg.content === 'here') {
					mention = 'here';
				}
			});
			await call.prompt(`What would you like the title of your announcement to be?`,
				{ time: 25000 }).then((msg) => {
				embedTitle = msg.content;
			});
			await call.prompt(`What would you like as the body of your announcement?`,
				{ time: 25000 }).then((msg) => {
				embedBody = msg.content;
			});
			call.message.channel.bulkDelete(8)
			if(mention === 'everyone') channel.send(call.message.guild.defaultRole.toString());
			if(mention === 'here') channel.send('@here');
			const finalizedEmbed = new Discord.RichEmbed()
				.setTitle(embedTitle)
				.setDescription(embedBody)
				.setTimestamp()
				.setColor('BLURPLE')
				.setFooter(`Announced by ${call.message.author.tag}`);
			channel.send(finalizedEmbed);
			call.message.channel.send(`I've sent the announcement with the details you entered! Prompt has now ended.`).then(msg3 => {
				setTimeout(() => {
					msg3.delete()
				}, 5000);
			})
			console.log(`${call.message.author.tag} ran the dannounce command.`);
		} catch (error) {
			if(error === 'Error: Prompt ended: cancelled') return;
			console.log(`[ERROR: dannounce.JS] - ${error}`.error);
		}
	}
};