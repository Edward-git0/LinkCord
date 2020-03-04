const Discord = require('discord.js');
const moment = require('moment')
module.exports = {
    id: 'userinfo',
    aliases: ['ui'],
    channels: 'guild',
    exec: async (call) => {
        try {
			let mentioned = call.message.mentions.members.first() || call.message.guild.members.find(u => u.user.id === call.args[0]) || call.message.guild.members.find(u => u.user.username === call.args.slice(0).join(' ')) || call.message.guild.members.find(u => u.displayName === call.args.slice(0).join(' '))
			let m = await call.message.channel.send(`Fetching the info!`)
			const online = call.client.emojis.get("684588435213779029")
			const idle = call.client.emojis.get("684588553602465813")
			const dnd = call.client.emojis.get("684588521993928726")
			const offline = call.client.emojis.get("684588620971114513")
			let status;
			let botif;
			let playinggame;
			if(!mentioned) {
				if(call.message.author.presence.status === "online") status = `${online} Online`
				if(call.message.author.presence.status === "idle") status = `${idle} Idle`
				if(call.message.author.presence.status === "dnd") status = `${dnd} Do Not Disturb`
				if(call.message.author.presence.status === "offline") status = `${offline} Offline`
				if(call.message.author.bot === true) botif = ":robot: Yes"
				if(call.message.author.bot === false) botif = ":robot: No"
				if(call.message.author.presence.game === null) playinggame = "Nothing."
				if(call.message.author.presence.game !== null) playinggame = call.message.author.presence.game.name
				let embed1 = new Discord.RichEmbed()
				.setTitle(`${call.message.author.username}'s information`)
				.addField("Tag:", call.message.author.tag)
				.addField("ID:", call.message.author.id)
				.addField("Presence:", `${status} || Playing ${playinggame}`)
				.addField(`Roles(${call.message.member.roles.size - 1})`, call.message.member.roles.array())
				.addField("Bot?", botif)
				.addField("Joined server at:", moment(call.message.member.joinedAt).format('MMM/DD/YYYY'))
				.addField(`Joined Discord at`, moment(call.message.author.createdAt).format('MMM/DD/YYYY'))
				.setColor('RANDOM')
				.setTimestamp()
				.setThumbnail(call.message.author.avatarURL)
				if(call.message.author.id === "300816697282002946") {
					embed1.addField("Notes:", `Offical ${call.client.user.username} developer :tada:`)
				}
				m.edit(embed1)
				return;
			}
			if(mentioned.user.presence.status === "online") status = `${online} Online`
			if(mentioned.user.presence.status === "idle") status = `${idle} Idle`
			if(mentioned.user.presence.status === "dnd") status = `${dnd} Do Not Disturb`
			if(mentioned.user.presence.status === "offline") status = `${offline} Offline`
			if(mentioned.user.bot === true) botif = ":robot: Yes"
			if(mentioned.user.bot === false) botif = ":robot: No"
			if(mentioned.user.presence.game === null) playinggame = "Nothing"
			if(mentioned.user.presence.game !== null) playinggame = mentioned.user.presence.game.name
			let embed = new Discord.RichEmbed()
			.setTitle(`${mentioned.user.username}'s information`)
			.addField("Tag:", mentioned.user.tag)
			.addField("ID:", mentioned.user.id)
			.addField("Presence:", `${status} || Playing ${playinggame}`)
			.addField(`Roles(${mentioned.roles.size - 1})`, mentioned.roles.array())
			.addField("Bot?", botif)
			.addField("Joined Server at", moment(mentioned.joinedAt).format('MMM/DD/YYYY'))
			.addField('Joined Discord At:', moment(mentioned.user.createdAt).format('MMM/DD/YYYY'))
			.setColor('RANDOM')
			.setTimestamp()
			.setThumbnail(mentioned.user.avatarURL)
			if(mentioned.id === "300816697282002946") {
				embed.addField("Notes:", `Offical ${call.client.user.username} developer :tada:`)
			}
			m.edit(embed)
        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
