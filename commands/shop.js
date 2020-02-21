const Discord = require('discord.js');
module.exports = {
    id: 'shop',
    aliases: ['buythings', 'linkcoinshop', 'edward', 'store'],
    channels: 'guild',
    exec: async (call) => {
        try {

            let filter = await call.client.shopData.filter(find => {
                return find.guildID === call.message.guild.id & find.forSale === true
            });
            let possibleEmojis = [];
            filter.forEach(findReactions => {
                possibleEmojis.push(findReactions.itemReactable)
            })

            let reactionFilter = (reaction, user) => {
                return possibleEmojis.includes(reaction.emoji.name) && user.id === call.message.author.id
            }

            const linkCoin = call.client.emojis.get('670675326837194782');


            if(filter.size === 0) return call.message.channel.send(`There are no items for sale right now.`)


            let embedDesc = '';
                filter.forEach(found => {
                    embedDesc += `${found.itemReactable}** __${found.itemName}__** \nDescription: ${found.itemDesc} \nCost: ${found.itemCost} ${linkCoin} \nQuantity: ${found.itemQuan} \n\n` 
                });



            const shopEmbed = new Discord.RichEmbed()
            .setTitle(`${linkCoin} LinkCoins Shop`)
            .setColor('BLURPLE')
            .setDescription(embedDesc);
            call.message.channel.send(`Click on the reactions below to purchase.`)
            let embedMessage = await call.message.channel.send(shopEmbed)


            possibleEmojis.forEach(emojis => {
                embedMessage.react(emojis)
            });


            embedMessage.awaitReactions(reactionFilter, { max: 1, time: 180000})
            .then(collected => {
                let collectedEmoji = collected.first().emoji.name;

                if(collectedEmoji === '💎') {
                    call.message.reply(`This item's forSale status changed while you were entering the prompt. You have not recieved the item, nor has the balance been deducted. \nThis item's status was \`open\`, but it is now \`store closed for public users. Please try again when the bot is public\` `)
                }
                if(collectedEmoji === '🖼️') {
                    call.message.reply(`This item's forSale status changed while you were entering the prompt. You have not recieved the item, nor has the balance been deducted. \nThis item's status was \`open\`, but it is now \`store closed for public users. Please try again when the bot is public\` `)
                }
                if(collectedEmoji === '🛃') {
                    call.message.reply(`This item's forSale status changed while you were entering the prompt. You have not recieved the item, nor has the balance been deducted. \nThis item's status was \`open\`, but it is now \`store closed for public users. Please try again when the bot is public\` `)
                }
            })
            



        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
