const { RichEmbed } = require('discord.js');
const pagedSend = require('../functions/pagedSend.js');
module.exports = {
	id: 'leaderboard',
	aliases: ['lb', 'levels'],
	desc: 'Shows a leaderboard of the top 25 members, sorted by their level.',
	exec: (call) => {

		const linkCoin = call.client.emojis.get('670675326837194782');

		const filtered = call.client.econData.filter((filter) => filter.guildID === call.message.guild.id);
		let arrayofleaders = [];
		for (const data of filtered.values()) {
			arrayofleaders.push(`**${call.client.users.get(data.userID).tag}:** ${data.linkCoins} ${linkCoin}`);
		}
		let embed = new RichEmbed();
		embed.setTitle(`LinkCoin Leaderboard`);
		embed.setColor('BLUE');
		pagedSend(call, embed, { values: arrayofleaders, valuesPerPage: 10 });
	}
};