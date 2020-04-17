const Discord = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    id: 'gif',
    aliases: ['g'],
    desc: 'Allows you to search Tenor for gifs',
    category: 'public',
    enabled: true, 
    channels: 'guild',
    exec: (call) => {
        try {
		let text = call.args[0]
			fetch(`https://api.tenor.com/v1/random?key=&q=${text}&limit=1`)
      .then(res => res.json())
      .then(json => call.message.channel.send(json.results[0].url))
      .catch(e => {
        call.message.channel.send('Failed to find a gif that matched your query');
        // console.error(e);
        return;
      });
        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
