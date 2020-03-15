const Discord = require('discord.js');
module.exports = {
    id: 'redeem',
    aliases: [],
    desc: 'Allows you to redeem codes for the linkshop.',
    category: 'public',
    enabled: true, 
    channels: 'guild/dm/any',
    exec: (call) => {
        try {
			if(!call.args[0])
				return call.message.channel.send(`Please provide a code to redeem`)
			let data = call.client.tempData.find(tbh => {
				return tbh.code === call.args[0] 
			});

			if (!data)
				return call.message.channel.send(`Sorry, that code is invalid.`)

			call.client.econData.math(`${call.message.author.id}-${call.message.guild.id}`, '+', parseInt(data.coinsToGive), 'linkCoins')

			call.message.channel.send(`You have successfully redeemed the code! You were granted ${data.coinsToGive} LinkCoins!`)
			call.client.tempData.delete(call.args[0])
        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
