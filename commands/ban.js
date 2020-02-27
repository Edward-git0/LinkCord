const ms = require('ms');
const { RichEmbed } = require('discord.js');
module.exports = {
	id: 'ban',
	desc: 'Allows the user to ban a user from  the current guild. Requires the Adminstrator Role.',
	exec: async (call) => {
		
		if(!call.message.member.hasPermission('BAN_MEMBERS')) return call.message.reply(`You cannot ban people!`)

	
		if (!call.message.guild.me.hasPermission('BAN_MEMBERS'))
			return call.message.channel.send('I do not have the Ban Members permission!');

		let calledMember = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));

		if (!calledMember)
			return call.message.channel.send(`Invalid user argument! \`${call.prefixUsed}ban [@mention/id] {optional reason}\``);

		let reason = call.args.slice(1).join(' ') || 'No Reason Given';

		if (call.message.member.highestRole.comparePositionTo(calledMember.highestRole) < 0)
			return call.message.channel.send('The user that you are trying to ban has a higher role than you.');

		if (call.message.member.highestRole.comparePositionTo(call.message.guild.me.highestRole) < 0)
			return call.message.channel.send('The user that you are trying to ban has a higher role than me.');

		if (!call.message.guild.member(calledMember).bannable)
			return call.message.channel.send('I can\'t ban that person! Do I have a lower role then them? Do I have the Ban Members Permisison?');
			let caseNum = call.client.guildData.get(call.message.guild.id, 'lastcase') + 1;
			call.client.guildData.set(call.message.guild.id, caseNum, 'lastcase');


			const toDMEmbed = new RichEmbed()
			.setTitle(`You were banned from LinkCord!`)
			.setDescription(`You were banned from LinkCord for __${reason}__ \n\nDo you feel this ban was unfair? Visit our appeals server [here](https://discord.gg/BqcXKsc)`)
			.setColor('RED')
			.setFooter(`You were banned from LinkCord indefinitly. Feel its unfair? Visit the appeals server.`)
			.setTimestamp()
			await calledMember.send(toDMEmbed).catch(error => {
				call.message.channel.send(`I failed to DM the user. The ban was still logged.`)
			});
		
		await call.message.guild.member(calledMember).ban(`${call.message.author.tag} banned For reason ${reason}`);

		

		

		call.client.moderationData.set(`${caseNum}-${call.message.guild.id}-${calledMember.user.id}`, {
			userid: calledMember.id,
			moderator: call.message.author.tag,
			guildid: call.message.guild.id,
			caseid: caseNum,
			punishmenttype: 'ban',
			punishmentreason: reason,
			expiry: Date.now() + ms('30d')
		});

		call.message.channel.send(`The user ${calledMember.user.tag} was banned for __${reason}__`);

	}
};