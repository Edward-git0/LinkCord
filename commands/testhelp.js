const Discord = require('discord.js');
module.exports = {
    id: 'testhelp',
	aliases: ['h'],
	category: 'public',
    desc: 'Displays this help command to you in dms.',
    enabled: true,
    channels: 'guild',
    exec: (call) => {
        try {
        let find = call.commands.filter(c => {
			return c.category === '.' && c.enabled === true
        })

        if(find.size === 0)
            return call.message.channel.send(`There are no commands available for view. You may be blacklisted or the bot may be under maintenance.`)
        
        let message = '';
        find.forEach(tbh => {
            message += tbh.id + '-' + tbh.desc + '\n'
        })

        call.message.channel.send(message)
		call.message.channel.send(`I found ${find.size}`)
        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
