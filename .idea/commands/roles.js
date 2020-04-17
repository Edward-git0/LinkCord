const Discord = require('discord.js');
const ms = require('ms')
const fetchOptionalRoleID = require('../functions/fetchOptionalRoleID.js')
const fetchOptionalRoleName = require('../functions/fetchOptionalRoleName.js')
module.exports = {
    id: 'roles',
    aliases: ['roleslist', 'optionalroles'],
    desc: 'Allows you to see the optional roles of the server',
    category: 'public',
    enabled: true, 
    channels: 'guild',
    exec: async (call) => {

        //THIS CODE IS PROPERTY OF LINKCORD. REMOVING THIS LINE WILL CAUSE THE FILE TO SELF DELETE!

        try {
        let roles = call.client.matchableRoles

        if(roles.size <= 0)
            return call.message.reply(`There are no optional roles at this time.`)
        //Arrays 
        let prompt1CollectorArray = ['1️⃣', '2️⃣', '3️⃣', '🗑️']
        let desc = ''

        //Filters
        let prompt1Filter = (reaction, user) => {
            return prompt1CollectorArray.includes(reaction.emoji.name) && user.id === call.message.author.id
        };
        

        let initialMessage = await call.message.channel.send(`${call.client.emojis.get('694971589154045952')} Loading this prompt`)
        //Embeds

            //First initial Embed
        const firstEmbed = new Discord.RichEmbed()
        .setTitle(`LinkCord optional role selector`)
        .setDescription(`1️⃣ Ping roles \n2️⃣ DevCord roles \n3️⃣ GameCord roles`)
        .setThumbnail(call.message.guild.iconURL)
        .setColor(`BLURPLE`)
        .setFooter(`React with the corresponding emoji to access each submenu. This prompt last's 4 mins. You can also react with the 🗑️ reaction to end this prompt.`)
        initialMessage.edit(`React with the emoji next to the submenu you would like to view`, { embed: firstEmbed })

            //Ping roles embed
        const pingRolesEmbed = new Discord.RichEmbed()
        .setTitle(`Ping Roles`)
        .setColor(`BLURPLE`)
        .setThumbnail(call.message.guild.iconURL)
        .setFooter(`This prompt will expire within 4 mins and allows 1 reaction. You can also react with the 🗑️ reaction to end this prompt now.`)

            //GameCord roles embed
        const gameCordRolesEmbed = new Discord.RichEmbed()
        .setTitle(`GameCord Roles`)
        .setColor(`BLURPLE`)
        .setThumbnail(call.message.guild.iconURL)
        .setFooter(`This prompt will expire within 4 mins and allows 1 reaction. You can also react with the 🗑️ reaction to end this prompt now.`)

            //DevCord roles embed
        const devCordRolesEmbed = new Discord.RichEmbed()
        .setTitle(`DevCord Roles`)
        .setColor(`BLURPLE`)
        .setThumbnail(call.message.guild.iconURL)
        .setFooter(`This prompt will expire within 4 mins and allows 1 reaction. You can also react with the 🗑️ reaction to end this prompt now.`)
        
        //React to the message 
        await initialMessage.react('1️⃣')
        await initialMessage.react('2️⃣')
        await initialMessage.react('3️⃣')
        
        const collected = await initialMessage.awaitReactions(prompt1Filter, {
            time: ms('4m'),
            max: 1
        });


        //Ping roles
        if(collected.first().emoji.name === '1️⃣') {
            let pingRoles = roles.filter(r => {
                return r.cat === 'pingable' && r.enabled.toLowerCase() === 'yes'
            });


            if(pingRoles.size <= 0) {
                initialMessage.clearReactions()
                initialMessage.edit(`There is no DevCord roles available right now. Please re-run the command at a later time.`)
                return;
            }

            await initialMessage.clearReactions()
            pingRoles.forEach(each => {
                desc += `${each.emoji} ~ ${each.name} \n`
                initialMessage.react(each.emoji)
            })
            const array = pingRoles.map(r => r.emoji)

            let pingableRolesEmbedCollectorFilter = (reaction, user) => {
                return array.includes(reaction.emoji.name) && user.id === call.message.author.id
            }
            pingRolesEmbed.setDescription(desc)
            initialMessage.edit(pingRolesEmbed)
            const pingCollector = await initialMessage.awaitReactions(pingableRolesEmbedCollectorFilter, {
                time: ms('4m'),
                max: 1
            });
            if(call.message.member.roles.has(fetchOptionalRoleID(call.client, pingCollector))) {
                call.message.member.removeRole(fetchOptionalRoleID(call.client, pingCollector), ['They requested it be removed in a prompt.'])
                initialMessage.edit(`Thanks for using LinkCord! I've removed the role \`${fetchOptionalRoleName(call.client, pingCollector)}\` from you.`, { embed: null })
                return
            }
            call.message.member.addRole(fetchOptionalRoleID(call.client, pingCollector), ['They requested it in a prompt.'])
            initialMessage.clearReactions()
            initialMessage.edit(`Thanks for using LinkCord! I've assigned the role \`${fetchOptionalRoleName(call.client, pingCollector)}\` to you.`, { embed: null })
            initialMessage.clearReactions()
        } //DevCord 
        else if (collected.first().emoji.name === '2️⃣') {
            let devRoles = roles.filter(r => {
                return r.cat === 'devcord' && r.enabled.toLowerCase() === 'yes'
            });


            if(devRoles.size <= 0) {
                initialMessage.clearReactions()
                initialMessage.edit(`There is no pingable roles available right now. Please re-run the command at a later time.`, { embed: null})
                return;
            }

            await initialMessage.clearReactions()
            devRoles.forEach(each => {
                desc += `${each.emoji} ~ ${each.name} \n`
                initialMessage.react(each.emoji)
            })
            const array = devRoles.map(r => r.emoji)

            let pingableRolesEmbedCollectorFilter = (reaction, user) => {
                return array.includes(reaction.emoji.name) && user.id === call.message.author.id
            }
            devCordRolesEmbed.setDescription(desc)
            initialMessage.edit(devCordRolesEmbed)
            const devCollector = await initialMessage.awaitReactions(pingableRolesEmbedCollectorFilter, {
                time: ms('4m'),
                max: 1
            });
            if(call.message.member.roles.has(fetchOptionalRoleID(call.client, devCollector))) {
                call.message.member.removeRole(fetchOptionalRoleID(call.client, devCollector), ['They requested it be removed in a prompt.'])
                initialMessage.edit(`Thanks for using LinkCord! I've removed the role \`${fetchOptionalRoleName(call.client, devCollector)}\` from you.`, { embed: null })
                return
            }
            call.message.member.addRole(fetchOptionalRoleID(call.client, devCollector), ['They requested it in a prompt.'])
            initialMessage.clearReactions()
            initialMessage.edit(`Thanks for using LinkCord! I've assigned the role \`${fetchOptionalRoleName(call.client, devCollector)}\` to you.`, { embed: null })
        } //GameCord
        else if (collected.first().emoji.name === '3️⃣') {
            let gameRoles = roles.filter(r => {
                return r.cat === 'gamecord' && r.enabled.toLowerCase() === 'yes'
            });


            if(gameRoles.size <= 0) {
                initialMessage.clearReactions()
                initialMessage.edit(`There is no game roles available right now. Please re-run the command at a later time.`, { embed: null})
                return;
            }

            await initialMessage.clearReactions()
            gameRoles.forEach(each => {
                desc += `${each.emoji} ~ ${each.name} \n`
                initialMessage.react(each.emoji)
            })
            const array = gameRoles.map(r => r.emoji)

            let pingableRolesEmbedCollectorFilter = (reaction, user) => {
                return array.includes(reaction.emoji.name) && user.id === call.message.author.id
            }
            gameCordRolesEmbed.setDescription(desc)
            initialMessage.edit(gameCordRolesEmbed)
            const gameCollector = await initialMessage.awaitReactions(pingableRolesEmbedCollectorFilter, {
                time: ms('4m'),
                max: 1
            });
            if(call.message.member.roles.has(fetchOptionalRoleID(call.client, gameCollector))) {
                call.message.member.removeRole(fetchOptionalRoleID(call.client, gameCollector), ['They requested it be removed in a prompt.'])
                initialMessage.edit(`Thanks for using LinkCord! I've removed the role \`${fetchOptionalRoleName(call.client, gameCollector)}\` from you.`, { embed: null })
                return
            }
            call.message.member.addRole(fetchOptionalRoleID(call.client, gameCollector), ['They requested it in a prompt.'])
            initialMessage.edit(`Thanks for using LinkCord! I've assigned the role \`${fetchOptionalRoleName(call.client, gameCollector)}\` to you.`, { embed: null })
            initialMessage.clearReactions()
        } //Cancel the prompt 
        else if (collected.first().emoji.name === '🗑️') {
            initialMessage.edit(`${call.client.emojis.get('694971589154045952')} This prompt is now closing.`)
            call.message.delete()
            initialMessage.delete(ms('3s'))
        }
		
        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
