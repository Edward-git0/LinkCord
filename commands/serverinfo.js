/* eslint-disable no-inner-declarations */
const Discord = require('discord.js');
module.exports = {
    id: 'serverinfo',
    aliases: ['serverinfo'],
    channels: 'guild',
    exec: (call) => {
        try {
            function checkDays(date) {
                let now = new Date();
                let diff = now.getTime() - date.getTime();
                let days = Math.floor(diff / 86400000);
                return days + (days == 1 ? " day" : " days") + " ago";
            }
            const serverbed = new Discord.RichEmbed()
                .setTitle("Server Information")
                .addField("Name", call.message.guild.name, true)
                .addField("Owner: ", `Edward`, true)
                .addField("Region", `:flag_us: US East`, true)
                .addField(
                    "Members: ",
                    `${call.message.guild.members.filter(member => !member.user.bot).size}`,
                    true
                )
                .addField(
                    "Bots: ",
                    `${call.message.guild.members.filter(member => member.user.bot).size}`,
                    true
                )
                .addField("Channels: ", call.message.guild.channels.size, true)
                .addField("Roles: ", call.message.guild.roles.size, true)
                .addField(
                    "Created: ",
                    `${call.message.channel.guild.createdAt
					.toUTCString()
					.substr(0, 16)} (${checkDays(call.message.channel.guild.createdAt)})`
                )
                .setThumbnail(call.message.guild.iconURL)
                .setTimestamp()
                .setFooter("LinkCord")
                .setColor("BLURPLE");

            call.message.channel.send(serverbed);
        } catch (error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
};