const Discord = require('discord.js');
module.exports = {
    id: 'purge',
    aliases: ['deletemessages', 'bulkdelete'],
    channels: 'guild/dm/any',
    exec: async (call) => {
        try {

			let role = call.message.guild.roles.get('658837499325579264')

			if(!call.message.member.roles.has(role.id)) return; 
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
            await call.message.channel.fetchMessages({
                limit: toDelete
            }).then(messages => {
                call.message.channel.bulkDelete(messages);
            });

            
            
            log.send(`${call.message.author.tag} has run the purge command to clear ${call.message.channel.toString()} of ${toDelete} messages. `)

			


        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
