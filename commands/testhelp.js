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
        

        let permissionLevel;
        let find;
        if(call.message.member.roles.has('658837632066912276')) {
            console.log('admin')
            permissionLevel = 'admin'
            find = call.commands.filter(c => {
                return c.category === 'public' || c.category === 'developer' || c.category === 'staff'
            });
        }

        if(call.message.member.roles.has('659011063312023572') || call.message.member.roles.has('658867543120805898')) {
            console.log('staff')
            permissionLevel = 'staff'
            find = call.commands.filter(c => {
                return c.category === 'public' || c.category === 'staff' & c.enabled === true
            });

            if(!call.message.member.hasPermission('KICK_MEMBERS')) {
                permissionLevel = 'member'
                find = call.commands.filter(c => {
                    return c.category === 'public' && c.enabled === true
                });
            }
        }
        if(find.size === 0)
            return call.message.channel.send(`There are no commands available for view. You may be blacklisted or the bot may be under maintenance.`)
        
        let message = '';
        find.forEach(tbh => {
            message += tbh.id + '-' + tbh.desc + '\n'
        })

        call.message.channel.send(message)
        call.message.channel.send(`You viewing commands for ${permissionLevel}`)
		call.message.channel.send(`I found ${find.size}`)
        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
