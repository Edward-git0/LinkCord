module.exports = {
	id: 'clearstrike',
	desc: 'Clears all strikes for the mentioned user.',
	category: 'developer',
	enabled: true,
	exec: async (call) => {
		let calledMember = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));

		if(!call.message.member.roles.has(call.message.guild.roles.get('658837632066912276').id)) 
			return;
		
		
		if(call.message.author.id === '443664778901061633')
			return call.message.reply('no code. ')
		if (calledMember) {
			let found = call.client.moderationData.filter((find) => find.userid === calledMember.user.id && find.guildid === call.message.guild.id);

			call.prompt('Are you sure you want to do this? This will delete all of the strikes for this user and **cannot** be undone.',
				{ time: 60000, filter: ['yes', 'no'] })
				.then((msg) => {
					if (msg.content.toLowerCase() === 'yes') {
						// never use forEach
						for (let fa of found.values()) {
							call.client.moderationData.delete(`${fa.caseid}-${call.message.guild.id}-${fa.userid}`);
						}
						call.message.channel.send(`All of the strikes for ${calledMember.user.username} were cleared.`);
					}

					if (msg.content.toLowerCase() === 'no')
						call.message.channel.send('Cancelled.');
				});
		} else {
			call.message.channel.send('Please mention a valid user.');
		}
	}
};
