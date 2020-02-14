const Discord = require('discord.js');
module.exports = {
    id: 'newapply',
    aliases: ['betaapply'],
    channels: 'guild/dm/any',
    exec: (call) => {
        try {
        let database = call.client.application



        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
