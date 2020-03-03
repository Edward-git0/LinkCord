const Discord = require('discord.js');
module.exports = {
    id: 'add',
    aliases: ['baladd', 'balanceadd', 'configadduserbal'],
    channels: 'guild',
    exec: (call) => {
        try {
			let role1 = call.message.guild.roles.find(r => r.name === 'Community Agent')
			let role2 = call.message.guild.roles.find(r => r.name === 'Administrator')
			console.log(call.message.member.roles)
            if (call.message.member.roles.has(role1.id) || call.message.member.roles.has(role2.id)) {

                let target = call.message.mentions.users.first()
                if (!target) return call.message.channel.send(`Mention a user!`)
                let prevBal = call.client.econData.get(`${target.id}-${call.message.guild.id}`, 'linkCoins');
                let toAdd = call.args[1];
                if (!toAdd || isNaN(toAdd)) return call.message.channel.send("Please enter a **valid** amount of money. :x:");
                let finalToAdd = parseInt(toAdd)
                call.client.econData.math(`${target.id}-${call.message.guild.id}`, '+', finalToAdd, 'linkCoins');
                let newBal = call.client.econData.get(`${target.id}-${call.message.guild.id}`, 'linkCoins')
                call.message.channel.send(`⚒️ I am updating the value in the database, please wait for the server to respond.`).then(msg => {
                    const embed = new Discord.RichEmbed()
                        .setTitle('Database edit success')
                        .setDescription(`**I have successufully updated this users \`econData.linkCoins\` data.** \nTheir old balance was **${prevBal}** \nTheir new balance is **${newBal}**`)
                        .setFooter(`LinkCord Adminstration Module - Commands run on this module are logged`)
                        .setTimestamp();
                    msg.edit(embed)
                });
            } else {
                call.message.reply(`You can't do that!`).then(msg => msg.delete(5000))
            }


        } catch (error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`)
            console.log(error)
        }
    }
};