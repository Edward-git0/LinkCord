const Discord = require('discord.js');
module.exports = {
    id: 'roles',
    aliases: ['roleslist', 'optionalroles'],
    desc: 'No Description Provided',
    category: 'public',
    enabled: true, 
    channels: 'guild/dm/any',
    exec: (call) => {
        try {
		let roles = call.client.matchableRoles
		
		roles.filter(r => {
			return r.enabled === true
		});
		let desc;
		roles.forEach(d => {
			desc += `${d.emoji}: ${d.name}`
		})
		let embed = new Discord.RichEmbed()
		.setTitle(`Optional Roles`)
		.setDescription(desc)
		call.message.channel.send(`React with then emoji next to the role to gain that role.`, { embed: embed })
        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
