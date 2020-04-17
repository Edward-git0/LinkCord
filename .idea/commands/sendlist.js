const Discord = require('discord.js');
module.exports = {
    id: 'sendlist',
    aliases: [],
    desc: 'Allows the admins to refresh the lists.',
    category: 'public',
    enabled: true, 
    channels: 'guild',
    exec:async (call) => {
        try {
			if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === 'Administrator').id)) {
				let pingFilter = call.client.matchableRoles.filter(c => {
					return c.cat === 'pingable'
				})
				let gameFilter = call.client.matchableRoles.filter(c => {
					return c.cat === 'gamecord'
				})
				let devFilter = call.client.matchableRoles.filter(c => {
					return c.cat === 'devcord'
				})
				let desc1 = ''
				let desc2 = ''
				let desc3 = ''
				let pingableRoles = pingFilter.map(m => {
					desc1 += `${m.emoji}: ${m.name} \n`
				});
				let devCordRoles = devFilter.map(m => {
					desc2 += `${m.emoji}: ${m.name} \n`
				})
				let gameCordRoles = gameFilter.map(m => {
					desc3 += `${m.emoji}: ${m.name} \n`
				})
			let pingableEmbed = new Discord.RichEmbed()
			.setTitle(`Notification`)
			.setDescription(desc1)
			.setThumbnail(call.message.guild.iconURL)
			.setFooter(`React with the reactions below to gain a role.`)
			let gameEmbed = new Discord.RichEmbed()
			.setTitle(`GameCord`)
			.setDescription(desc3)
			.setThumbnail(call.message.guild.iconURL)
			.setFooter(`React with the reactions below to gain a role.`)
			let devEmbed = new Discord.RichEmbed()
			.setTitle(`DevCord`)
			.setDescription(desc2)
			.setThumbnail(call.message.guild.iconURL)
			.setFooter(`React with the reactions below to gain a role.`)
			
			
			call.message.guild.channels.find(c => c.name === 'roles').send(pingableEmbed).then(async msg => {
				call.client.systemData.set('system', msg.id, 'pingableReactionMessageID')
				pingFilter.forEach(async u => {
					await msg.react(u.emoji)
				})
			})
			call.message.guild.channels.find(c => c.name === 'roles').send(devEmbed).then(async msg => {
				call.client.systemData.set('system', msg.id, 'devCordReactionMessageID')
				devFilter.forEach(async u => {
					await msg.react(u.emoji)
				})
			})
			call.message.guild.channels.find(c => c.name === 'roles').send(gameEmbed).then(async msg => {
				call.client.systemData.set('system', msg.id, 'gameCordReactionMessageID')
				gameFilter.forEach(async u => {
					await msg.react(u.emoji)
				})
			})
			}

        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
