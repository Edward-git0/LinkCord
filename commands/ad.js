const Discord = require('discord.js');
module.exports = {
    id: 'ad',
    aliases: ['postad', 'advertisement'],
    channels: 'guild',
    exec: (call) => {
        try {
        call.message.channel.send(`Hello! Welcome to the ad prompt! Please wait while I prepare the command for you.`).then(msg => {
            setTimeout(() => {
                msg.edit(`I've setup the prompt for you! I'll be sending you a DM shortly to continue with the prompt. Please make sure your DM's are open, and I am unblocked.`)
            }, 2000);
        })
        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
};