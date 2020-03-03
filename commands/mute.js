const Discord = require('discord.js');
module.exports = {
    id: 'name',
    aliases: ['alias array'],
    channels: 'guild/dm/any',
    exec: async (call) => {
        try {

            if(!call.message.member.hasPermission('MUTE_MEMBERS'))
                return;
            
            let muteRole = call.message.guild.roles.find(r => r.name === 'Muted')
            let reason = call.args[0];
            if(!muteRole) {
                call.client.channels.get('659149534894489639').send(`The muted role was deleted!!! I am creating a new one and updating the channel overrides.`)
                muteRole = await call.message.guild.createRole({
                    name: 'Muted', 
                    permissions: []
                }, ['The muted role was deleted. Making a new one and overwriting channel permissions'])
                call.message.guild.channels.forEach(async c => {
                    c.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            }

            if(!reason)
                return call.message.reply(`Invalid usage! ${call.prefixUsed}${call.command} [user mention/id] [reason]`)

        } catch(error) {
            call.message.channel.send(`💥 Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
