const Discord = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    id: 'slap',
    aliases: ['smack'],
    desc: 'Lets you slap people!',
    category: 'public',
    enabled: true, 
    channels: 'guild',
    exec: (call) => {
        try {
		let user = call.message.mentions.users.first()
		if(!user)
			call.message.channel.send(`Who do you want to slap?`)
			fetch(`https://api.tenor.com/v1/random?key=&q=slap&limit=1`)
      .then(res => res.json())
      .then(json => {
		let slap = new Discord.RichEmbed()
		.setDescription(`**${call.message.author}** slapped ${user}`)
		.setFooter(`SMACK ~ LinkCord`)
		.setColor('BLURPLE')
		.setImage(json.results[0].url)
		call.message.channel.send(slap)
	  });
        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
