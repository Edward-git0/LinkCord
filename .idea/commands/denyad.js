const Discord = require('discord.js');
module.exports = {
    id: 'denyad',
    category: 'staff',
    enabled: true,
    desc: 'Allows staff to decline submitted advertisements',
    aliases: [],
    channels: 'guild',
    exec: (call) => {
        try {
            if(call.message.channel.name !== 'ad-approval') {
                return;
            }
            
            let id = call.args[0]
            let reason = call.args.splice(1).join(' ')
            if(!id)
                return call.message.channel.send('Provide an ID.')
            let ad = call.client.ads.find(a => {
                return a.status === 'waiting' && a.adID === id
            })
            
            if(!ad) 
                return call.message.channel.send(`No advertisement with that ID found.`)
            
            call.client.users.get(ad.applyingUserID).send('**Your advertisment was denied in LinkCord** \n' + `Your advertisment with an ID of **${ad.adID}** was declined by ${call.message.author.tag} for ` + '```' + reason + '```')
            call.client.ads.delete(`${ad.adID}-${ad.applyingUserID}`)

            call.message.delete()
        } catch (error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
};