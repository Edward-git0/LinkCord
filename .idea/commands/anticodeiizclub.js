const Discord = require('discord.js');
module.exports = {
    id: 'anticodeiizclub',
    aliases: ['acc'],
    desc: 'Turns on April fools joke :)',
    category: 'developer',
    enabled: true, 
    channels: 'guild',
    exec: async (call) => {
        try {
		
		if(call.message.author.id === '300816697282002946') {
            let load = call.client.emojis.get('694971589154045952')
            let orignalMessage = await call.message.channel.send(`${load} OK, We are now the Anti-Codeiiz Club! Estimated time working: 5:32`)
            
            await call.message.guild.setName('Anti Codeiiz Club (ACC)')
            await call.message.guild.setIcon('https://cdn.discordapp.com/attachments/694972213618671687/695009736260583464/anticodeiiz.png')

            //Channels:

                //Try and get the channels to rename them.
            
            //Information:
            let rules = call.message.guild.channels.get('658780835763191821')
            let faq = call.message.guild.channels.get('660644421968068628')
            let welcome = call.message.guild.channels.get('659179304135032843')

            //Server 
            let announcements = call.message.guild.channels.get('658780897675575356')
            let changelog = call.message.guild.channels.get('660923343133999105')
            let polls = call.message.guild.channels.get('658780930432827404')
            let git = call.message.guild.channels.get('672941247664750649')
            let roles = call.message.guild.channels.get('690660367105392721')
            
            //COMMUNITY AND EVENTS
            let twitterfeed = call.message.guild.channels.get('679525916287696959')
            let events = call.message.guild.channels.get('659566851696885791')
            let giveaways = call.message.guild.channels.get('659566862668922882')
            let diamondevents = call.message.guild.channels.get('663414156380340304')
            let diamondgiveaways = call.message.guild.channels.get('663414183353778198')
            let voting = call.message.guild.channels.get('688494798843281535')
            let eventvoice = call.message.guild.channels.get('663414314467852299')

            //Social
            let general = call.message.guild.channels.get('660229347067559964')
            let cmds = call.message.guild.channels.get('658781098293329995')
            let memes = call.message.guild.channels.get('663416606059134986')
            let suggestions = call.message.guild.channels.get('668104692865171456')
            let ads = call.message.guild.channels.get('659844377362956300')
            let voicechatchannel = call.message.guild.channels.get('684241590977691686')
            let voice1 = call.message.guild.channels.get('658680354378481683')
            let voice2 = call.message.guild.channels.get('659418976199245824')
            let musicvoice = call.message.guild.channels.get('670095349456699394')

            //Gamecord
            let lfg = call.message.guild.channels.get('663425146727563286')
            let gameimages = call.message.guild.channels.get('665970350600880177')
            let gamehangout = call.message.guild.channels.get('670045920062078998')
            let gamev1 = call.message.guild.channels.get('675069097548972042')
            let gamev2 = call.message.guild.channels.get('675069214134108170')
            let gamev3 = call.message.guild.channels.get('675069248791379979')
            let gamev4 = call.message.guild.channels.get('675069275488256000')

            //DONE CHANNEL DECLARATIONS ---- START RENAME 

            await rules.setName('codeiiz-rules')
            await faq.setName('anti-codeiiz-questions')
            await welcome.setName('welcome-to-the-acc')
            await announcements.setName('anti-ruzzle-announcements')
            await changelog.setName('anti-codeiiz-changelog')
            await polls.setName('anti-codeiiz-questions')
            await git.setName('git')
            await roles.setName('anti-codeiiz-roles')
            await twitterfeed.setName('tweets-about-codeiiz')
            await events.setName('hurt-codeiiz-events')
            await giveaways.setName('codeiiz-giveaways')
            await diamondevents.setName('diamonds-events')
            await diamondgiveaways.setName('diamond-giveaways')
            await voting.setName('is-codeiiz-gay')
            await eventvoice.setName('Anti Codeiiz Events')
            await general.setName('talk-about-codeiiz')
            await cmds.setName('ban-codeiiz')
            await memes.setName('anti-ruzzle-memes')
            await suggestions.setName('anti-codeiiz-suggestions')
            await ads.setName('anti-codeiiz-adverts')
            await voicechatchannel.setName('text-chat-for-ruzzle')
            await voice1.setName('Anti Codeiiz Voice 1')
            await voice2.setName('Anti Codeiiz Voice 2')
            await musicvoice.setName('Anti-Codeiiz Songs')
            await lfg.setName('looking-for-anti-codeiiz-games')
            await gameimages.setName('anti-codeiiz-game-images')
            await gamehangout.setName('anti-codeiiz-games-hangout')
            await gamev1.setName('Anti Codeiiz Game Voice 1')
            await gamev2.setName('Anti Codeiiz Game Voice 2')
            await gamev3.setName('Anti Codeiiz Game Voice 3')
            await gamev4.setName('Anti Codeiiz Game Voice 4')

            orignalMessage.edit(':white_check_mark: Finished the revertation!')

           await call.message.channel.send(`${load} Contacting glitch to change the Old bot's name`)
           await call.message.channel.send(`:x: Couldn't contact Glitch. \n\nAction Complete :white_check_mark:`)


		} else {
			call.message.channel.send('no')
		}
        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
