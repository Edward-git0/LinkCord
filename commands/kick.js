const ms = require('ms');
const { RichEmbed } = require('discord.js');
module.exports = {
	id: 'kick',
	desc: 'Allows the user to kick a user from  the current guild. .',
	exec: async (call) => {
		
		if(!call.message.member.hasPermission('KICK_MEMBERS')) return call.message.reply(`You cannot kick people!`)

	
		if (!call.message.guild.me.hasPermission('KICK_MEMBERS'))
			return call.message.channel.send('I do not have the Kick Members permission!');

		let calledMember = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));
		if (!calledMember)
			return call.message.channel.send(`Invalid user argument! \`${call.prefixUsed}kick [@mention/id] {optional reason}\``);

		let reason = call.args.slice(1).join(' ') || 'No Reason Given';

		if (call.message.member.highestRole.comparePositionTo(calledMember.highestRole) < 0)
			return call.message.channel.send('The user that you are trying to kick has a higher role than you.');

		

		if (!call.message.guild.member(calledMember).bannable)
			return call.message.channel.send('I can\'t kick that person! Do I have a lower role then them? Do I have the kick Members permission?');
			let caseNum = call.client.guildData.get(call.message.guild.id, 'lastcase') + 1;
			call.client.guildData.set(call.message.guild.id, caseNum, 'lastcase');


			const toDMEmbed = new RichEmbed()
			.setTitle(`You were kicked from LinkCord!`)
			.setDescription(`You were kicked from LinkCord for __${reason}__ `)
			.setColor('RED')
			.setTimestamp()
			await calledMember.send(toDMEmbed).catch(() => {
				call.message.channel.send(`I failed to DM the user. The kick was still logged.`)
			});
		
		await call.message.guild.member(calledMember).kick(`${call.message.author.tag} kicked For reason ${reason}`);

		

		

		call.client.moderationData.set(`${caseNum}-${call.message.guild.id}-${calledMember.user.id}`, {
			userid: calledMember.id,
			moderator: call.message.author.tag,
			guildid: call.message.guild.id,
			caseid: caseNum,
			punishmenttype: 'kick',
			punishmentreason: reason,
			expiry: Date.now() + ms('30d')
		});

		call.message.channel.send(`The user ${calledMember.user.tag} was kicked for __${reason}__`);

	}
};