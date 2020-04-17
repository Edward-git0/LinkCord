const Discord = require('discord.js')
module.exports = (client, message) => {

    // if (message.author.id === '443664778901061633') {
    // 	if (message.attachments.size > 0)
    // 		return message.delete()
    // }

    if (message.channel.type === 'text') {
        let messageContent = message.content.replace(`**`, '')
        messageContent = messageContent.replace(`***`, '')
        messageContent = messageContent.replace(`*`, '')
        messageContent = messageContent.replace(`*`, '')
        let regx = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi
        if (regx.test(messageContent.toLowerCase().replace(/\s+/g, ''))) {
            if (client.config.inviteLinkFilterEnabled === false)
                return;
            if(message.author.bot)
                return;
            if (message.member.roles.has(message.guild.roles.find(r => r.name === 'Administrator').id))
                return;
            message.delete();
            message.author.send(`⚠️ **Invite links to other servers are not permitted in ${message.channel}** ⚠️ \nIf you would like to advertise in our server, please submit an advertisement witht the \`~ad\` command. `)
            client.channels.find(c => c.name === 'logs').send(`**⚠️ Automoderator took an action in ${message.channel} ⚠️** \n**The message by ${message.author.tag}** has the content of ` + '```' + message.content + '```' + 'and was flagged because of `Discord Invite`')
        }


    }


    if (message.author.bot)
        return;


    if (message.channel.type === 'text') {
        client.econData.ensure(`${message.author.id}-${message.guild.id}`, {
            userID: message.author.id,
            guildID: message.guild.id,
            linkCoins: 175,
            lastDaily: "0",
            purchases: [],
        });
        client.cooldownData.ensure(`${message.author.id}-${message.guild.id}`, {
            userID: message.author.id,
            activeCoolGuildID: message.guild.id,
            commandsWithActiveCool: [],
            commandHashWithActiveCool: [],
            coolPardon: false,
        });
        client.guildData.ensure(message.guild.id, {
            lastcase: 0,
            cases: [],
            playing: false,
            queue: []
        });
        client.systemData.ensure('system', {
            pingableReactionMessageID: '0',
            devCordReactionMessageID: '0',
            gameCordReactionMessageID: '0'
        })

        if (client.econData.get(`${message.author.id}-${message.guild.id}`, 'linkCoins') < 0) {
            client.econData.set(`${message.author.id}-${message.guild.id}`, 0, 'linkCoins')
        }
    }


};