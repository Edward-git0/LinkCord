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
                let userData = call.client.econData;
                let shopData = call.client.shopData;
                if(collectedEmoji === '💎') {
                    call.message.reply(`Purchasing the Diamond rank...`).then(msg => {
                        if(userData.get(`${call.message.author.id}-${call.message.guild.id}`, 'linkCoins') < shopData.get('Diamond-658680354378481675', 'itemCost')) {
                            return msg.edit(`You don't have enough LinkCoins to complete this purchase.`)
                        }
                        call.client.econData.math(`${call.message.author.id}-${call.message.guild.id}`, '-', 1500, 'linkCoins')

                        call.message.member.addRole(shopData.get('Diamond-658680354378481675', 'roleIDtoAdd'), `${call.message.author.tag} Purchased Diamond`)

                        msg.edit(`You are now the owner of Diamond Rank! :)`)
                        let dmRecieptEmbed = new Discord.RichEmbed()
                        .setTitle(`Your reciept for the purchase of diamond rank.`)
                        .setDescription(`You purchased \`Diamond Rank\` for a total of ${shopData.get(`Diamond-658680354378481675`, 'itemPrice')} and now have a balance of ${call.client.econData.get(`${call.message.author.id}-${call.message.guild.id}`, 'linkCoins')}`)
                        .setFooter(`If you ever were to loose your rank, you can show this message as proof of purchase. Don't loose it.`)
                        call.message.author.send(dmRecieptEmbed)
                        
                    });
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
