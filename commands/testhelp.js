const Discord = require('discord.js');
module.exports = {
    id: 'testhelp',
	aliases: ['h'],
	category: 'public',
    desc: 'Displays this help command to you in dms.',
    enabled: true,
    channels: 'guild',
    exec: (call) => {
        try {
        
        let permissionLevel;
        let find;
        if(call.message.member.highestRole.id === '658837632066912276') {
            console.log('admin')
            permissionLevel = 'admin'
            find = call.commands.filter(c => {
                return c.category === 'public' || c.category === 'developer' || c.category === 'staff'
            });

        }

        if(call.message.member.highestRole.id === '660251268924571692' || call.message.member.highestRole.id === '658837499325579264' || call.message.member.highestRole.id === '659408832761561122' || call.message.member.highestRole.id === '659011063312023572') {
            console.log('staff')
            permissionLevel = 'staff'
            find = call.commands.filter(c => {
                return c.category === 'public' || c.category === 'staff' & c.enabled === true
            });

            if(!call.message.member.hasPermission('KICK_MEMBERS')) {
                permissionLevel = 'member'
                console.log('member')
                find = call.commands.filter(c => {
                    return c.category === 'public' && c.enabled === true
                });
            }
        }
        if(!find) {
            let emergencylight = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${emergencylight} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon. \nDatabase unavailable`);
            return;
        }

        if(find.size === 0)
            return call.message.channel.send(`There are no commands available for view. You may be blacklisted or the bot may be under maintenance.`)
        
        let message = '';
        let embed = new Discord.RichEmbed()
        .setTitle(`LinkCord Commands`)
        .setFooter(`Thanks for using LinkCord!`)
        .setColor('BLURPLE')
        .setThumbnail('https://cdn.discordapp.com/icons/658680354378481675/a_f75c6f232c265c3d1976b025f195d8eb.jpg')
        let embed2 = new Discord.RichEmbed()
        .setTitle(`LinkCord Commands (continued)`)
        find.forEach(tbh => {
            if(embed.fields.length >= 25) {
                embed2.addField(tbh.id, tbh.desc)
                return;
            }
            embed.addField(tbh.id, tbh.desc)

            
        })
        embed.setDescription(message)
        call.message.channel.send(embed)
        if(embed2.fields.length > 0) {
            call.message.channel.send(embed2)
        }
        call.message.channel.send(`You viewing commands for ${permissionLevel}`)
		call.message.channel.send(`I found ${find.size}`)
        } catch(error) {
            let emergencylight = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${emergencylight} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
