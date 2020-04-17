const Discord = require('discord.js');
module.exports = {
    id: 'vcremove',
    aliases: ['vcr'],
    desc: 'Allows you to remove a user from your private voice channel.',
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
                return call.message.channel.send(`Please reply with a valid user.`);
            if(!channel.permissionOverwrites.get(mentioned.id))
                return call.message.channel.send(`The user is not added to this channel.`)
            channel.permissionOverwrites.get(mentioned.id).delete('The user removed them from their VC.')
            channel.setUserLimit(channel.userLimit - 1);
            mentioned.setVoiceChannel(null);

            call.message.channel.send(`I have successfully removed that user from your voice-channel.`)

        } catch (error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
};