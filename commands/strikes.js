const { RichEmbed } = require('discord.js');
const pagedSend = require('../functions/pagedSend.js');
const moment = require('moment');

module.exports = {
	id: 'strikes',
	desc: 'Checks the list of things that the user has done. Things here are not more than 30 days old.',
	exec: async (call) => {
		if (!call.args[0])
			return call.message.channel.send('Please supply a valid user mention or id');

		let member = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));

		if (!member)
			return;

		let found = call.client.moderationData.filter((find) => find.userid === member.user.id && find.guildid === call.message.guild.id);

		if (found.size === 0)
			return call.message.channel.send('No strikes or moderation actions were found for the mentioned user.');

		let arr = found.map((strike) => `**Moderation Type:** ${strike.punishmenttype}\n` +
			`**Punishment Reason:** ${strike.punishmentreason}\n` +
			`**Punishment Expires:** ${moment(strike.expiry).format('MM/DD/YYYY hh:mm:ss')}\n` +
			`**Guild case ID:** ${strike.caseid} \n\n`);
		let embed = new RichEmbed();
		let strikes = arr.length;

		embed
			.setTitle(`Infractions (${strikes})`)
			.setColor('RED');

		pagedSend(call, embed, { values: arr, valuesPerPage: 3 });
	}
};