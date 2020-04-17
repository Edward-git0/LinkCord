// This is only a template; fill in the proper arguments based on the event below.
let {RichEmbed} = require('discord.js')
module.exports = async (client, oldMember, newMember) => {
    let newStateChannel = newMember.voiceChannel;
    let guild = oldMember.guild;
    if(newStateChannel === undefined) { // Disconnecting from any voice channel on the server
        let vc = oldMember.voiceChannel;

        if(!vc)
            return;
        if(vc.name !== `🔒 ${oldMember.user.username}`)
            return;
        await vc.delete('The user no longer requires a private VC.');
        oldMember.send(`Your voice-channel was deleted because you left it.`)
    } else if(newStateChannel) { // Connecting or switching to any voice channel on the server // deafening or muting
        //Private VC's
        if(oldMember.voiceChannel) {
            if(oldMember.voiceChannel === newMember.voiceChannel) return;
            if(oldMember.voiceChannel.name === `🔒 ${oldMember.user.username}`) {
                await oldMember.voiceChannel.delete('The user no longer requires a private VC.');
                oldMember.send(`Your voice-channel was deleted because you left it.`)
            }
        }

        if(newMember.voiceChannel.id === '700094024135999549') {

            guild.createChannel(`🔒 ${oldMember.user.username}`, {
                type: "voice",
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: ["CONNECT", "SPEAK"]
                    },
                    {
                        id: oldMember.user.id,
                        allow: ["CONNECT", "SPEAK", "STREAM", "USE_VAD", "PRIORITY_SPEAKER", "MUTE_MEMBERS", "DEAFEN_MEMBERS"]
                    },
                    {
                        id: guild.roles.find(r => r.name === 'Administrator').id,
                        allow: ["CONNECT", "SPEAK", "PRIORITY_SPEAKER", "MUTE_MEMBERS", "DEAFEN_MEMBERS"]
                    },
                    {
                        id: guild.roles.find(r => r.name === 'Moderator').id,
                        allow: ["CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS"]
                    }
                ]
            }).then(userVC => {
                userVC.setParent(guild.channels.get('700062494865227856'))
                newMember.setVoiceChannel(userVC);
                userVC.setUserLimit(1)
                let embed = new RichEmbed()
                    .setAuthor(`${oldMember.user.username} (${oldMember.user.id})`, oldMember.user.avatarURL)
                    .setTitle(`:warning: **This system is in a beta stage; there may be bugs or unfinished aspects of it**`)
                    .setColor('BLURPLE')
                    .setThumbnail(oldMember.guild.iconURL)
                    .setTimestamp()
                    .setDescription(`**You've just created a private voice-channel in LinkCord!**

__ Some tips before you begin __

As of right now, this channel is only visible to you! 

To add your friends, use the \`~vcadd [@user/ID]\` command which will **add **them to the voice-channel. 

To remove your friends, use the \`~vcremove [@User/ID]\` command with will **remove **them from the voice-channel.

To give your friends a permission, use the \`~vcpermission [@User/ID]\` command. This will open a prompt which will guide you in permissions to your friends. At this time only the Streaming permission is available

In the future there will be limits on this system, but for now it is available for all server members.


*Please note:* These channels will only exist when **you** are in them. Once you leave, the channel will be deleted.

*Abuse of this system in any way (creating vc's in a spammy way, using your VC for something against server rules) will earn you a ban from the system*`)

                newMember.send(embed)
            });
        }
    }
};