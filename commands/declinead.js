const Discord = require('discord.js');
module.exports = {
    id: 'declinead',
    category: 'staff',
    enabled: true,
    desc: 'Allows staff to decline submitted advertisements',
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