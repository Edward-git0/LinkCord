const { RichEmbed } = require('discord.js');
const ms = require('ms');
module.exports = {
	id: 'strike',
	desc: 'Warns a user based on their actions. Increases their strike count by 1.',
	exec: async (call) => {
		let log = call.client.channels.get('659149534894489639')
		let role = call.message.guild.roles.find((r) => r.name === 'Moderator');

		if (!role || !call.message.member.roles.has(role.id))
			return;

		let calledMember = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));
		let reason = call.args[1];

		if (!reason)
			return call.message.channel.send(`Please provide a valid reason. \`${call.prefixUsed}strike [@mention/id] [reason]\` `);

		reason = call.args.splice(1).join(' ');

		if (!calledMember)
			return call.message.channel.send(`Please provide a valid user mention/id. \`${call.prefixUsed}strike [@mention/id] [Reason]\` `);

		calledMember.send(`You recived a strike in ${call.message.guild.name} for ${reason}.`);

		let caseNum = call.client.guildData.get(call.message.guild.id, 'lastcase') + 1;

		call.client.guildData.set(call.message.guild.id, caseNum, 'lastcase');
		call.client.moderationData.set(`${caseNum}-${call.message.guild.id}-${calledMember.user.id}`, {
			userid: calledMember.id,
			guildid: call.message.guild.id,
			caseid: caseNum,
			punishmenttype: 'strike',
			punishmentreason: reason,
			expiry: Date.now() + ms('30d')
		});
		const strikeEmbed = new RichEmbed()
		.setTitle(`New Strike by ${call.message.author.tag}`)
		.setDescription(`**User ID:** ${calledMember.id} \n\n**Guild ID:** ${call.message.guild.id} \n\n**Case ID:** ${caseNum} \n\n**Strike reason:** ${reason} \n\n**Expiry:** ${Date.now() + ms('30d')}`)
		log.send(strikeEmbed)
		call.message.channel.send(`User ${calledMember.user.username} recieved 1 strike. Case Num: ${caseNum}`);
	}
};