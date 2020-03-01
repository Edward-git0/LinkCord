const Discord = require('discord.js');
module.exports = {
    id: 'remove',
    aliases: ['balrem', 'balanceremove', 'configadduserbalremove'],
    channels: 'guild',
    exec: (call) => {
        if (call.message.member.roles.some(r => r.name === "Event Host") || call.message.member.roles.some(r => r.name = 'Administrator')) {
            let target = call.message.mentions.users.first()
            if (!target) return call.message.channel.send(`Mention a user!`)
            let prevBal = call.client.econData.get(`${target.id}-${call.message.guild.id}`, 'linkCoins');
            let toRemove = call.args[1];
            if (!toRemove || isNaN(toRemove)) return call.message.channel.send("Please enter a **valid** amount of money. :x:");
            let finalToAdd = parseInt(toRemove)
            call.client.econData.math(`${target.id}-${call.message.guild.id}`, '-', finalToAdd, 'linkCoins');
            let newBal = call.client.econData.get(`${target.id}-${call.message.guild.id}`, 'linkCoins')
            call.message.channel.send(`⚒️ I am updating the value in the database, please wait for the server to respond.`).then(msg => {
                const embed = new Discord.RichEmbed()
                    .setTitle('Database edit success')
                    .setDescription(`**I have successufully updated this users \`econData.linkCoins\` data.** \nTheir old balance was **${prevBal} LinkCoins** \nTheir new balance is **${newBal} LinkCoins**`)
                    .setFooter(`LinkCord Adminstration Module - Commands run on this module are logged`)
                    .setTimestamp();
                msg.edit(embed)
            });
        } else {
            call.message.channel.send(`You can't run this command!`)
        }
    }
};