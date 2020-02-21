const Discord = require('discord.js');
module.exports = {
    id: 'shop',
    aliases: ['buythings', 'linkcoinshop', 'edward'],
    channels: 'guild',
    exec: async (call) => {
        try {

            let filter = await call.client.shopData.filter(find => {
                return find.guildID === call.message.guild.id && find.forSale === true
            });
            let possibleEmojis = [];
            filter.forEach(findReactions => {
                possibleEmojis.push(findReactions.itemReactable)
            })
            let reactionFilter = (reaction, user) => {
                return possibleEmojis.includes(reaction) && user.id === call.message.author.id
            }
            const linkCoin = call.client.emojis.get('670675326837194782');
            if(filter.size === 0) return call.message.channel.send(`There are no items for sale right now.`)
            let embedDesc = '';
                filter.forEach(found => {
                    embedDesc += `${found.itemReactable}** __${found.itemName}__** \nDescription: ${found.itemDesc} \nCost: ${found.itemCost} ${linkCoin} \nQuantity: ${found.itemQuan} \n\n` 
                })
            const shopEmbed = new Discord.RichEmbed()
            .setTitle(`${linkCoin} LinkCoins Shop`)
            .setColor('BLURPLE')
            .setDescription(embedDesc);
            call.message.channel.send(`Click on the reactions below to purchase.`)
            let embedMessage = await call.message.channel.send(shopEmbed)
            possibleEmojis.forEach(emojis => {
                embedMessage.react(emojis)
            })
            const collect = embedMessage.createReactionCollector(reactionFilter, { max: 1, time: 180000 })

            collect.on('collect', (reaction, reactionCollector) => {
                call.message.channel.send(reaction)
            })
            
        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
