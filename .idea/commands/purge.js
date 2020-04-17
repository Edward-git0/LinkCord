const Discord = require('discord.js');
module.exports = {
    id: 'purge',
    category: 'staff',
    desc: 'Allows staff to clean the channel up by deleting messages.',
    enabled: true,
    aliases: ['deletemessages', 'bulkdelete'],
    channels: 'guild/dm/any',
    exec: async (call) => {
        try {

            if(!call.message.member.permissions.has('MANAGE_MESSAGES'))
                return;
            await call.message.delete();
            let toDelete = call.args[0]
			if (!toDelete || isNaN(toDelete)) return call.message.channel.send("Please enter a **valid** amount of messages. :x:");
            if(toDelete > 100 || toDelete < 2) return call.message.reply(`Please pick a number from **2** to **100**`)

            let log = call.message.guild.channels.find(c => c.name === 'logs')

            let embed = new Discord.RichEmbed()
            .setTitle(`Unable to execute this command. `)
            .setDescription(`Something went wrong during the execution of this command. This issue is **not** code related. \nError code: E637`)
            .setFooter(`LinkCord`)
            if(!log) return call.message.channel.send(embed)
            if(!log.permissionsFor(call.message.guild.me)) {
                let embed = new Discord.RichEmbed()
                .setTitle(`Unable to execute this command. `)
                .setDescription(`Something went wrong during the execution of this command. This issue is **not** code related. \nError code: E638`)
                .setFooter(`LinkCord`)
                call.message.channel.send(embed)
            }
            await call.message.channel.bulkDelete(toDelete).catch(error => {
                call.message.channel.send(`I was unable to bulk-delete some messages in this channel. Are they over 14 days old?`)
            })


            log.send(`${call.message.author.tag} has run the purge command to clear ${call.message.channel.toString()} of ${toDelete} messages. `)




        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
};
