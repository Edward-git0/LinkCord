const Discord = require('discord.js');
module.exports = {
    id: 'ping',
    aliases: ['pong'], // defaults to []
    channels: 'any', // defaults to 'any'. options are: 'dm', 'guild', 'any'.
    // 'call' is an instance of the Call class, a class containing various properties and utility functions.
    exec: (call) => {
        call.message.channel.send(`Ping? Give me a second!`).then(msg => {
            const embed = new Discord.RichEmbed()
            .setTitle(`Ping Statitics`)
            .setDescription(`:ping_pong: My ping is ${Math.round(call.client.ping)}ms`)
            .setFooter(`You ran this command on Linkcord.`)
            msg.edit(embed);
        });
    }
};