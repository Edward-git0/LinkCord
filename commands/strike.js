const { RichEmbed } = require('discord.js');
const ms = require('ms');
const moment = require('moment')
module.exports = {
	id: 'strike',
	aliases: ['warn'],
	category: 'staff',
	desc: 'Warns a user based on their actions. Increases their strike count by 1.',
	enabled: true,
	exec: async (call) => {
		let log = call.client.channels.get('659149534894489639')

		if(!call.message.member.permissions.has('MANAGE_MESSAGES'))
			return;

		let calledMember = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));
		let reason = call.args[1];


		reason = call.args.splice(1).join(' ');

		if (!calledMember)
			return call.message.channel.send(`Please provide a valid user mention/id. \`${call.prefixUsed}strike [@mention/id] [Reason]\` `);
		if (!reason)
			return call.message.channel.send(`Please provide a valid reason. \`${call.prefixUsed}${call.command.id} [@mention/id] [reason]\` `);
		if (call.message.member.highestRole.comparePositionTo(calledMember.highestRole) < 0)
			return call.message.channel.send('The user that you are trying to strike has a higher role than you.');
		await calledMember.send(`You recived a strike in ${call.message.guild.name} for ${reason}.`);

		let caseNum = call.client.guildData.get(call.message.guild.id, 'lastcase') + 1;

		call.client.guildData.set(call.message.guild.id, caseNum, 'lastcase');
		call.client.moderationData.set(`${caseNum}-${call.message.guild.id}-${calledMember.user.id}`, {
			userid: calledMember.id,
			moderator: call.message.author.tag,
			guildid: call.message.guild.id,
			caseid: caseNum,
			punishmenttype: 'strike',
			punishmentreason: reason,
			expiry: moment(Date.now() + ms('30d')).format('MM/DD/YYYY')
		});
		const strikeEmbed = new RichEmbed()
		.setTitle(`New Strike by ${call.message.author.tag}`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(`Edward, thetechguy61705, Codiiz`)
		.setDescription(`**User ID:** ${calledMember.id} \n\n**Guild ID:** ${call.message.guild.id} \n\n**Case ID:** ${caseNum} \n\n**Strike reason:** ${reason} \n\n**Expiry:** ${Date.now() + ms('30d')}`)
		log.send(strikeEmbed)
		call.message.channel.send(`User ${calledMember.user.username} recieved 1 strike. Case Num: ${caseNum}`);

		let findStrike = call.client.moderationData.filter(d => {
			return d.expiry < Date.now() + ms('30d') && d.userid === calledMember.id
		});
		if(findStrike.size >= 5) {
			call.message.channel.send(`I am kicking **${calledMember.user.tag}**. They have greater than 5 strikes.`);

			await calledMember.send(`You have been kicked from LinkCord because you reached greater than 5 strikes.`)
			call.message.guild.member(calledMember).kick(`They have reached greater than 5 strikes`);
		}
	}
};