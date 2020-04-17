const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
    id: 'vcpermission',
    aliases: ['vcp'],
    desc: 'Allows you to edit the permissions of the users in your private VC.',
    category: 'public',
    enabled: true,
    channels: 'guild',
    exec: async (call) => {
        try {
            let channel = call.message.member.voiceChannel;
            let mentioned = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));

            if (!channel)
                return call.message.channel.send(`You don't have an active **Private** voice-channel.`);

            if (channel.name !== `🔒 ${call.message.author.username}`)
                return call.message.channel.send(`You cannot manage someone else's channel!`);
            if(!mentioned)
                return call.message.channel.send(`Please reply with a valid user.`)

            if(!channel.permissionOverwrites.has(mentioned.id))
                return call.message.channel.send(`This user is not added to your voice-channel. Add them first.`);
            let prompt1CollectorArray = ['1️⃣', '2️⃣', '3️⃣', '🗑️'];

            //Filters
            let prompt1Filter = (reaction, user) => {
                return prompt1CollectorArray.includes(reaction.emoji.name) && user.id === call.message.author.id
            };

            let initialMessage = await call.message.channel.send(`${call.client.emojis.get('694971589154045952')} Loading this prompt.`)

            //Embeds

            const embed1 = new Discord.RichEmbed()
                .setTitle(`Adding voice-channel permissions to ${mentioned.user.username}`)
                .setFooter(`This prompt belongs to ${call.message.author.username}(${call.message.author.id})`)
                .setTimestamp()
                .setColor('BLURPLE')
                .addField('1️⃣', 'Priority Speaker permission', true)
                .addField('2️⃣', 'Video permission (streaming, video chat)', true)
                .addField('3️⃣', 'Moderator Permissions (mute, deafen)', true)
            initialMessage.edit(embed1)
            initialMessage.react('1️⃣');
            initialMessage.react('2️⃣');
            initialMessage.react('3️⃣');
            const collected = await initialMessage.awaitReactions(prompt1Filter, {
                time: ms('4m'),
                max: 1
            });

            if(collected.first().emoji.name === '1️⃣') {
                if(channel.permissionsFor(mentioned.id).has('PRIORITY_SPEAKER')) {
                    //Remove the permissions from the channel
                    channel.overwritePermissions(mentioned.id, {
                        PRIORITY_SPEAKER: false
                    });
                    initialMessage.edit('I have successfully **removed** the permission `PRIORITY_SPEAKER` from that user.\nThe prompt has now ended.', { embed: null} );
                    initialMessage.clearReactions()
                    return;
                }
                channel.overwritePermissions(mentioned.id, {
                    PRIORITY_SPEAKER: true
                });
                initialMessage.edit('I have successfully **added** the permission `PRIORITY_SPEAKER` from that user.\nThe prompt has now ended.', { embed: null} );
                initialMessage.clearReactions()
            } else if(collected.first().emoji.name === '2️⃣') {
                if(channel.permissionsFor(mentioned.id).has('STREAM')) {
                    //Remove the permissions from the channel
                    channel.overwritePermissions(mentioned.id, {
                        STREAM: false
                    });
                    initialMessage.edit('I have successfully **removed** the permission `STREAM` from that user.\nThe prompt has now ended.', { embed: null} );
                    initialMessage.clearReactions()
                    return;
                }
                //Add them if they don't exist
                channel.overwritePermissions(mentioned.id, {
                    STREAM: true,
                });
                initialMessage.edit('I have successfully **added** the permission `STREAM` from that user.\nThe prompt has now ended.', { embed: null} );
                initialMessage.clearReactions()
            } else if (collected.first().emoji.name === '3️⃣') {
                if(channel.permissionsFor(mentioned.id).has('MUTE_MEMBERS')) {
                    //Remove the permissions from the channel
                    channel.overwritePermissions(mentioned.id, {
                        MUTE_MEMBERS: false,
                        DEAFEN_MEMBERS: false,
                    });
                    initialMessage.edit('I have successfully **removed** the permission `VOICE_MOD` from that user.\nThe prompt has now ended.', { embed: null} );
                    initialMessage.clearReactions()
                    return;
                }
                //Add them if they don't exist
                channel.overwritePermissions(mentioned.id, {
                    MUTE_MEMBERS: null,
                    DEAFEN_MEMBERS: null,
                });
                initialMessage.edit('I have successfully **added** the permission `VOICE_MOD` from that user.\nThe prompt has now ended.', { embed: null} );
                initialMessage.clearReactions()
            } else if (collected.first().emoji.name === '🗑️') {
                initialMessage.edit(`${call.client.emojis.get('694971589154045952')} This prompt is now closing.`)
                call.message.delete()
                initialMessage.delete(ms('3s'))
            }

        } catch (error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
};