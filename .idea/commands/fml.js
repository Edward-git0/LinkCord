const Discord = require('discord.js');
const request = require('request')
const cheerio = require('cheerio')
module.exports = {
    id: 'fml',
    aliases: ['fmylife'],
    desc: 'Allows you to view a FML quote from fmylife.com',
    category: 'public',
    enabled: true, 
    channels: 'guild',
    exec: async (call) => {
        try {
			let message = await call.message.channel.send(`Fetching an FML for you..`)
			request(
				{
					uri: 'http://www.fmylife.com/random'
				},
				(error, response, body) => {
					if (error) return call.message.channel.send(`Error: ${error}`);
					var $ = cheerio.load(body);
					const article = $('.article-link').first().text();
					const updoot = $('.vote-up-group .vote-count').first().text();
					const downdoot = $('.vote-down-group .vote-count').first().text();
	
					const embed = new Discord.RichEmbed()
						.setTitle(`Requested by ${call.message.author.tag}`)
						.setAuthor('FML Stories')
						.setColor(call.message.member.displayColor)
						.setTimestamp()
						.setDescription(`_${article}\n\n_`)
						.addField('I agree, your life sucks', updoot, true)
						.addField('You deserved it', downdoot, true);
	
					 message.edit({ embed });
				
				})
		} catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
