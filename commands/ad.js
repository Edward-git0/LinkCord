const Discord = require('discord.js');
const randomize = require('randomatic');
module.exports = {
    id: 'ad',
    category: 'public',
    enabled: true,
    desc: 'Allows you to post an advertisement to our advertising channels after approval.',
    aliases: ['postad', 'advertisement'],
    channels: 'guild',
    exec: async (call) => {
        try {
            
            let searchForPreviousAds = call.client.ads.find(search => {
                return search.applyingUserID === call.message.author.id
            });
            if(!searchForPreviousAds || searchForPreviousAds.cooldown === false) {
                const advertisementApprovalChat = call.client.channels.get(`659844354025979914`)
                const log = call.client.channels.get(`659149534894489639`)
    
                const exampleEmbed = new Discord.RichEmbed()
                    .setTitle(`Your title will go here`)
                    .setDescription(`Your embed body will go here.`)
                    .setFooter(`Your name will go here`)
                    .setImage('https://cdn.discordapp.com/attachments/663414650552975371/684169747952042065/Example-embed.jpeg')
                if (!advertisementApprovalChat) {
                    log.send(`${call.message.guild.defaultRole.toString()} I am warning you: ${call.message.author.tag} tried to run the advertisement command, but the ads approval channel was deleted. Fix it in the code`)
                    call.message.channel.send(`Something went wrong! The adminstration has been notified and will fix it shortly.`)
                }
                const initialMessage = await call.message.channel.send(`Hello! The advertisement prompt will continue in your DMs.`)
    
                const usersDMs = await call.message.author.createDM().catch(error => {
                    call.message.channel.send(`I couldn't send the DM. Please check the openness of your DMs`)
                });
                const titlePrompt = await call.prompt(`What would you like the title for your advertisement to be?`, {
                    time: 60000,
                    channel: usersDMs
                })
                initialMessage.edit(`Prompt in progress`)
                call.message.author.send(exampleEmbed)
                const embedBodyPrompt = await call.prompt(`What would you like the body of your embed to be?`, {
                    time: 50000,
                    channel: usersDMs
                })
    
                const collectImagePrompt = await call.prompt(`Please send an image attachment of the image you would like on your advertisement.`, {
                    time: 60000,
                    channel: usersDMs
                })
    
                const title = titlePrompt.content;
                const body = embedBodyPrompt.content;
                let imageURL = collectImagePrompt.attachments.first().url
                const adID = randomize(`A0`, 6);
                const approvalPrompt = new Discord.RichEmbed()
                    .setTitle(`${call.message.author.tag} submitted an advertisement with an ID of ${adID}`)
                    .setDescription(`**Title:** ${title} \n\n**Body:** ${body} \n\n The image is attached to this embed.`)
                    .setFooter(`You can approve or deny this with the ?approvead ${adID} or ?denyad ${adID} [reason]`)
                    .setColor('BLURPLE')
                    .setImage(imageURL);
    
                advertisementApprovalChat.send(approvalPrompt);
                //save to the database
    
                call.client.ads.set(`${adID}-${call.message.author.id}`, {
                    adID: adID,
                    status: 'waiting',
                    cooldown: true,
                    advertisementGuildID: call.message.guild.id,
                    dateSubmitted: Date.now(),
                    applyingUserID: call.message.author.id,
                    applyingUserTag: call.message.author.tag,
                    embedTitle: title,
                    embedBody: body,
                    embedImage: imageURL
                })
    
                const sendEmbed = new Discord.RichEmbed()
                    .setTitle(`Your advertisement has been sent!`)
                    .setDescription(`It could take up to 5 days for your ad to be approved. Please be patient. \n\n**Your advertisment ID is: ${adID}**`)
                call.message.author.send(sendEmbed)
    
                initialMessage.edit(`Prompt Finished.`)
            } else if(searchForPreviousAds.cooldown === true)
                return call.message.reply(`You've already had an ad in the past 6 hours. \n*Please note: It could take up to 5 mins for cooldowns to refresh*`)

           




        } catch (error) {
            call.message.reply(`Prompt cancelled. This may have something to do with you not sending a MessageAttachment. Try again by sending an attachment not a URL. `)
            console.log(error)
        }
    }
};