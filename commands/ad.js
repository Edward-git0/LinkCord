const Discord = require('discord.js');
module.exports = {
    id: 'ad',
    aliases: ['postad', 'advertisement'],
    channels: 'guild',
    exec: async (call) => {
        try {

        const advertisementApprovalChat = call.client.channels.get(`659844354025979914`)
        const log = call.client.channels.get(`659149534894489639`)

        if(!advertisementApprovalChat) {
          log.send(`${call.message.guild.defaultRole.toString()} I am warning you: ${call.message.author.tag} tried to run the advertisement command, but the ads channel was deleted. Fix it in the code`)
          call.message.channel.send(`Something went wrong! The adminstration has been notified and will fix it shortly.`)
        }
        call.message.channel.send(`Hello! The advertisement prompt will continue in your DMs.`)

        const usersDMs = await call.message.author.createDM().catch(error => return call.message.channel.send(`I couldn't open a DM, check if your DM's are open.`))
        const titlePrompt = await call.prompt(`What would you like the title for your advertisement to be?`, { time: 60000, channel: usersDMs })

        const embedBodyPrompt = await call.prompt(`What would you like the body of your embed to be?`, { time: 50000, channel: usersDMs })

        const collectImagePrompt = await call.prompt(`Please send an image attachment of the image you would like on your advertisement.`, { time: 60000, channel: usersDMs })


        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
};