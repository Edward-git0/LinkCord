const Discord = require('discord.js');
module.exports = {
    id: 'help',
    aliases: ['h'],
    category: 'public',
    desc: 'Displays this help command to you in dms.',
    enabled: true,
    channels: 'guild',
    exec: (call) => {
        try {

            let find;
            console.log('member')
            find = call.commands.filter(c => {
                return c.category === 'public' && c.enabled === true
            });
            if (call.message.member.highestRole.id === '658837632066912276' || call.message.member.roles.has(call.message.guild.roles.find(r => r.name === 'Administrator').id)) {
                console.log('admin')
                find = call.commands.filter(c => {
                    return c.category === 'public' || c.category === 'developer' || c.category === 'staff'
                });

            }

            if (call.message.member.highestRole.id === '660251268924571692' || call.message.member.highestRole.id === '658837499325579264' || call.message.member.highestRole.id === '659408832761561122' || call.message.member.highestRole.id === '659011063312023572' || call.message.member.roles.has('658867543120805898') || call.message.member.roles.has('659011063312023572')) {
				if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === 'Administrator').id))
					return;
				
				console.log('staff')
                find = call.commands.filter(c => {
                    return c.category === 'public' || c.category === 'staff' & c.enabled === true
                });
            }
            if (!find) {
                return call.message.channel.send(`There are no commands available for view. You may be blacklisted or the bot may be under maintenance.`)
            }

            if (find.size === 0)
                return call.message.channel.send(`There are no commands available for view. You may be blacklisted or the bot may be under maintenance.`)

            let message = '';
            let embed = new Discord.RichEmbed()
                .setTitle(`LinkCord Commands`)
                .setFooter(`Thanks for using LinkCord!`)
                .setColor('BLURPLE')
                .setThumbnail(call.message.guild.iconURL)
            let embed2 = new Discord.RichEmbed()
                .setTitle(`LinkCord Commands (continued)`)
                .setColor('BLURPLE')
                .setFooter(`Thanks for using LinkCord!`, call.client.user.avatarURL)
                .setThumbnail(call.message.guild.iconURL)
            find.forEach(tbh => {
                if (embed.fields.length >= 25) {
                    embed2.addField(tbh.id, tbh.desc)
                    return;
                }
                embed.addField(tbh.id, tbh.desc)


            })
            embed.setDescription(message)
            call.message.author.send(embed)
            if (embed2.fields.length > 0) {
                call.message.author.send(embed2)
            }
            call.message.channel.send(`${call.client.emojis.get('660886312798257162')} I've sent it over in your DMS's!`)
        } catch (error) {
            let emergencylight = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${emergencylight} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
};