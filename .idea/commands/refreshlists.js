const Discord = require('discord.js');
module.exports = {
    id: 'refreshlists',
    aliases: ['rl'],
    desc: 'Alllows the administration to refresh the embeds listed in the reaction collector channels.',
    category: 'developer',
    enabled: true, 
    channels: 'guild',
    exec: async (call) => {
        try {
			if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === 'Administrator').id)) {
				let channel = call.client.channels.find(c => c.name === 'roles')
				let pingableMessage = await channel.fetchMessage(call.client.systemData.get('system', 'pingableReactionMessageID'))
				let devCordMessage = await channel.fetchMessage(call.client.systemData.get('system', 'devCordReactionMessageID'))
				let gameCordMessage = await channel.fetchMessage(call.client.systemData.get('system', 'gameCordReactionMessageID'))
				if(!pingableMessage) {
					let noPingMessage = await channel.send(`Loading roles..`)

				}
				if(!devCordMessage) {
					let noDevMessage = await channel.send(`Loading roles..`)

				}
				if(!gameCordMessage) {
					let noMessage = await channel.send(`Loading roles..`)
				}


				
				let desc1 = ''
				let desc2 = ''
				let desc3 = ''
				let pingableRoles = call.client.matchableRoles.map(m => {
					desc1 += `${m.emoji}: ${m.name}`
				});
				let devCordRoles = call.client.matchableRoles.map(m => {
					desc2 += `${m.emoji}: ${m.name}`
				})
				let gameCordRoles = call.client.matchableRoles.map(m => {
					desc3 += `${m.emoji}: ${m.name}`
				})
				let pingableEmbed = new Discord.RichEmbed()
				.setTitle(`LinkCord optional Ping roles`)
				.setDescription(desc1)
				.setThumbnail(call.message.guild.iconURL)
				.setFooter(`React with the reactions below to gain a role.`)
				let gameEmbed = new Discord.RichEmbed()
				.setTitle(`LinkCord optional Ping roles`)
				.setDescription(desc3)
				.setThumbnail(call.message.guild.iconURL)
				.setFooter(`React with the reactions below to gain a role.`)
				let devEmbed = new Discord.RichEmbed()
				.setTitle(`LinkCord optional Ping roles`)
				.setDescription(desc2)
				.setThumbnail(call.message.guild.iconURL)
				.setFooter(`React with the reactions below to gain a role.`)

				if (!pingableMessage) {
					channel.send(pingableEmbed).then(msg => {
						pingableRoles.forEach(r => {
							msg.react(r.emoji)
						})
					})
					
					return;
				} else if (!devCordMessage) {
					channel.send(devEmbed).then(msg => {
						devCordRoles.forEach(r => {
							msg.react(r.emoji)
						})
					})
					return;
				} else if (!gameCordMessage) {
					channel.send(gameEmbed).then(msg => {
						gameCordRoles.forEach(r => {
							msg.react(r.emoji)
						})
					})
					return;
				}
				call.message.channel.send(`I have updated the messages.`)
			}
        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
