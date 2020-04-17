const Discord = require('discord.js');
module.exports = {
    id: 'vcadd',
    aliases: ['vca'],
    desc: 'Allows you to add members to your private voice-channel.',
    category: 'public',
    enabled: true,
    channels: 'guild',
    exec: (call) => {
        try {
            let channel = call.message.member.voiceChannel;
            let mentioned = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));

            if (!channel)
                return call.message.channel.send(`You don't have an active **Private** voice-channel.`);

            if (channel.name !== `🔒 ${call.message.author.username}`)
                return call.message.channel.send(`You cannot manage someone else's channel!`);
            if(!mentioned)
                return call.message.channel.send(`Please reply with a valid user.`)
            if(channel.permissionOverwrites.has(mentioned.id))
                return call.message.channel.send(`This user is already added to your voice-channel.`);
            channel.overwritePermissions(mentioned.user.id, {
                CONNECT: true,
                SPEAK: true,
                PRIORITY_SPEAKER: false,
                MUTE_MEMBERS: false,
                DEAFEN_MEMBERS: false,
                STREAM: false
            }, 'The user requested they be added to their voice-channel.').then(userVC => {
                call.message.channel.send(`The user was added to the voice-channel! You can update their permissions with \`${call.prefixUsed}vcpermission\``)
                channel.setUserLimit(channel.userLimit + 1)
            }).catch(error => {
                call.message.channel.send(`I was unable to add that user to the voice-channel.`)
            })


        }
         catch (error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
};