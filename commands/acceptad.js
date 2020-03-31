const Discord = require('discord.js');
module.exports = {
    id: 'acceptad',
    category: 'staff',
	enabled: true,
    aliases: [],
    channels: 'guild',
    exec: (call) => {
        try {
            if(call.message.channel.name !== 'ad-approval') {
                console.log('not ad approval')
                return;
            }
            
            let id = call.args[0]
            if(!id)
                return call.message.channel.send('Provide an ID.')
            let ad = call.client.ads.find(a => {
                return a.status === 'waiting' && a.adID === id
            })

            call.client.emit('adAccepted', ad.adID)

            call.message.delete()
            // call.message.channel.fetchMessage(ad.logChannelID).then(msg => {
            //     msg.delete();
            // }).catch(() => {
            //     call.message.reply(`Approved the advertisement, but unable to delete the log message. Please delete it manually.`).then(msg => {
            //         msg.delete(7000)
            //     })
            // })
            

            
        } catch (error) {
            call.message.channel.send(`:x:`);
            console.log(error);
        }
    }
};