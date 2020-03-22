const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms');
module.exports = {
    id: 'tempmute',
    aliases: ['tm'],
    category: 'staff',
    enabled: true,
    desc: 'Allows staff to mute users for a spe',
    channels: 'guild',
    exec: async (call) => {
        try {

            if(!call.message.member.hasPermission('MUTE_MEMBERS'))
                return;
            call.message.delete()
            let muteRole = call.message.guild.roles.find(r => r.name === 'Muted')
            let reason = call.args.splice(2).join(' ')
            let target = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));
            let time = call.args[1]
            if(!muteRole) {
                call.client.channels.get('659149534894489639').send(`The muted role was deleted!!! I am creating a new one and updating the channel overrides.`)
                muteRole = await call.message.guild.createRole({
                    name: 'Muted', 
                    permissions: []
                }, ['The muted role was deleted. Making a new one and overwriting channel permissions'])
                call.message.guild.channels.forEach(async c => {
                    c.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    });
                });
            }

            if(!reason)
                return call.message.reply(`Invalid usage! \`${call.prefixUsed}${call.command.id} [user mention/id] [time] [reason]\` `)
            if(!target) 
				return call.message.reply(`Invalid user! \`${call.prefixUsed}${call.command.id} [user mention/id] [reason] \``)

            if(!time)
                return call.message.channel.send(`Please specify a time to mute ${target.tag} for.`)
            
            
						target.addRole(muteRole, [`${call.message.author.tag} muted them for ${time}`])
						let caseNum = call.client.guildData.get(call.message.guild.id, 'lastcase') + 1;
						call.client.guildData.set(call.message.guild.id, caseNum, 'lastcase');


						call.client.moderationData.set(`${caseNum}-${call.message.guild.id}-${target.user.id}`, {
						userid: target.id,
						moderator: call.message.author.tag,
						guildid: call.message.guild.id,
						caseid: caseNum,
						punishmenttype: 'mute',
						punishmentreason: reason,
                        expiry: Date.now() + ms(time),
                        punishmentRemoved: false
						});
                        let channelEmbed = new Discord.RichEmbed()
                        .setTitle(`I have successfully muted ${target.user.tag}!`)
                        .setDescription(`**${target.user.tag} was muted for __${reason}__.**\nTheir mute will expire on ${moment(Date.now() + ms(time)).format('MMMM Do YYYY, h:mm:ss a')}  \nThis is case #${caseNum}`)
                        .setFooter(`LinkCord Moderation`)
                        .setColor('ORANGE')
						call.message.reply(channelEmbed)

						target.send(`**You have been muted in LinkCord!** \nYou were muted by ${call.message.author.tag} for ${reason} for ${time}`)



                        let embed = new Discord.RichEmbed()
                        .setTitle('⚠️ An tempmute was issued')
                        .setDescription(`A tempmute action was taken against ${target.user.tag} by ${call.message.author.tag} for reason __${reason}__. \n This mute will expire within 25s of ${moment(Date.now() + ms(time)).format('MMMM Do YYYY, h:mm:ss a')} \n**This is case #${caseNum}**`)
                        .setTimestamp()
                        .setColor('RED')
                        .setFooter(`LinkCord Moderation ~ Action`, call.message.author.avatarURL)
                        call.client.channels.get('659149534894489639').send(embed)



        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon. 💥`);
            console.log(error);
        }
    }
}; 
