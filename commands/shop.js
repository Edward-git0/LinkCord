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
            if(filter.size === 0) return call.message.channel.send(`There are no items for sale right now.`)
            let embedDesc = '';
            for (let found of filter)
                embedDesc += `**__${found.itemName}__** \nDescription: ${found.itemDesc} \nCost: ${found.itemCost} \nQuantity: ${found.itemQuan} \n\n` 
            
            const linkCoin = call.client.emojis.get('670675326837194782');
            const shopEmbed = new Discord.RichEmbed()
            .setTitle(`${linkCoin} LinkCoins Shop`)
            .setColor('BLURPLE')
            .setDescription(embedDesc);
            //.setDescription(`🔷: **__Diamond Role__** \nDescription: Gives access to diamond only perks including special giveaways and more! \nCost: 1500${linkCoin} \nQuantity: ♾️ \n\n 💠: **__Diamond + Role__** \nDescription: Access to all perks that Diamond gets you, but with extra abilities such as your own personal voice chats. \n`)
            call.message.channel.send(`Click on the reactions below to purchase.`)
            call.message.channel.send(shopEmbed)
        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
