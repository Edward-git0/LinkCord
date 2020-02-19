const Discord = require('discord.js');
const randomize = require('randomatic');
module.exports = {
    id: 'ad',
    aliases: ['postad', 'advertisement'],
    channels: 'guild',
    exec: async (call) => {
        try {

        const advertisementApprovalChat = call.client.channels.get(`659844354025979914`)
        const log = call.client.channels.get(`659149534894489639`)

        const exampleEmbed = new Discord.RichEmbed()
        .setTitle(`Your title will go here`)
        .setDescription(`Your embed body will go here.`)
        .setFooter(`Your name will go here`)
				.setImage('attachment://other-assets/B8EA4B6D-0A5C-42BE-9394-9DD69F02260C.jpeg')

        if(!advertisementApprovalChat) {
          log.send(`${call.message.guild.defaultRole.toString()} I am warning you: ${call.message.author.tag} tried to run the advertisement command, but the ads approval channel was deleted. Fix it in the code`)
          call.message.channel.send(`Something went wrong! The adminstration has been notified and will fix it shortly.`)
        }
       const initialMessage = await call.message.channel.send(`Hello! The advertisement prompt will continue in your DMs.`)

        const usersDMs = await call.message.author.createDM().catch(error => return call.message.channel.send(`I couldn't open a DM, check if your DM's are open.`))
        const titlePrompt = await call.prompt(`What would you like the title for your advertisement to be?`, { time: 60000, channel: usersDMs })
        initialMessage.edit(`Prompt in progress`)
        const embedBodyPrompt = await call.prompt(`What would you like the body of your embed to be?`, { time: 50000, channel: usersDMs })

        const collectImagePrompt = await call.prompt(`Please send an image attachment of the image you would like on your advertisement.`, { time: 60000, channel: usersDMs })

        const title = titlePrompt.content;
        const body = embedBodyPrompt.content;
        const imageURL = collectImagePrompt.attachments.first().url

				const approvalPrompt = new Discord.RichEmbed()
				.setTitle(`${call.messgae.author.tag} submitted an advertisement..`)
				.setDescription(`**Title:** ${title} \n\n**Body:** ${body} \n\n The image is attached to this embed.`)
				.setFooter(`You can approve or deny this with the ?approve [id] or ?deny [id] [reason]`)
				.setImage(imageURL);

				advertisementApprovalChat.send(approvalPrompt);
				//save to the database
        const adID = randomize(`A0`, 6);

				call.client.ads.set(`${adID}-${call.message.author.id}`, {
					adID: adID
					advertisementGuildID: call.message.guild.id, 
					dateSubmitted: Date.now()
					applyingUserID: call.message.author.id, 
					embedTitle: title,
					embedBody: body,
					embedImage: imageURL
				})



        initialPrompt.edit(`Prompt Finished.`)





        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
};