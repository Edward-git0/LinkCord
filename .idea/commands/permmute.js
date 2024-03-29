const Discord = require('discord.js');
module.exports = {
    id: 'permmute',
    aliases: ['pm'],
    category: 'staff',
    enabled: true,
    desc: 'Allows admins to mute users.',
    channels: 'guild',
    exec: async (call) => {
        try {

            if(!call.message.member.hasPermission('MUTE_MEMBERS'))
                return;
            
            let muteRole = call.message.guild.roles.find(r => r.name === 'Muted')
            let reason = call.args.splice(1).join(' ')
			let target = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));
            if(!muteRole) {
                call.client.channels.get('659149534894489639').send(`The muted role was deleted!!! I am creating a new one and updating the channel overrides.`)
                muteRole = await call.message.guild.createRole({
                    name: 'Muted', 
                    permissions: []
                }, ['The muted role was deleted. Making a new one and overwriting channel permissions'])
                call.message.guild.channels.forEach(async c => {
                    c.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            }

            if(!reason)
                return call.message.reply(`Invalid usage! \`${call.prefixUsed}${call.command.id} [user mention/id] [reason]\` `)
            if(!target) 
				return call.message.reply(`Invalid user! \`${call.prefixUsed}${call.command.id} [user mention/id] [reason] \``)

						target.addRole(muteRole, [`${call.message.author.tag} permanently muted them.`])
						let caseNum = call.client.guildData.get(call.message.guild.id, 'lastcase') + 1;
						call.client.guildData.set(call.message.guild.id, caseNum, 'lastcase');


						call.client.moderationData.set(`${caseNum}-${call.message.guild.id}-${target.user.id}`, {
						userid: target.id,
						moderator: call.message.author.tag,
						guildid: call.message.guild.id,
                        caseid: caseNum,
                        reason: reason,
						punishmenttype: 'mute',
						punishmentreason: reason,
                        expiry: 'perm'
						});

                        let channelEmbed = new Discord.RichEmbed()
                        .setTitle(`I have successfully muted ${target.user.tag}!`)
                        .setDescription(`**${target.user.tag} was muted for __${reason}__.**\nThis is case #${caseNum}`)
                        .setFooter(`This mute will never expire ~ LinkCord Moderation`)
                        .setColor('ORANGE')
						call.message.reply(channelEmbed)
						target.send(`**You have been muted in LinkCord!** \nYou were muted by ${call.message.author.tag} for ${reason}`)



					let loggingEmbed = new Discord.RichEmbed()
					.setTitle(`${target.user.tag} was muted`)
					.setDescription(`**Moderator:** ${call.message.author.tag} *(${call.message.author.id})* \n**Reason:** ${reason} \n**Case ID:** ${caseNum} \n**Expiry:** perm`)
					.setFooter(`This user was muted permanently. They must be unmuted manually with the ?unmute command`)
					.setTimestamp()
					.setColor(`RED`)
					call.client.channels.get('659149534894489639').send(loggingEmbed)


						

        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon. 💥`);
            console.log(error);
        }
    }
}; 
