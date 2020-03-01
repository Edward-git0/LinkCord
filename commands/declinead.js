const Discord = require('discord.js');
module.exports = {
    id: 'declinead',
    aliases: [],
    channels: 'guild',
    exec: (call) => {
        try {
            //code goes here
        } catch (error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
};