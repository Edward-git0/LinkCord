const Discord = require('discord.js');
module.exports = {
    id: 'prefix',
    aliases: ['p'],
    desc: 'Shows the prefix of the bot',
    category: 'public',
    enabled: true, 
    channels: 'guild',
    exec: (call) => {
        try {
        call.message.reply('My prefix is `~`')
        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
