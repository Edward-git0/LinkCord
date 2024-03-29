const Discord = require('discord.js');
module.exports = {
	id: 'addshopitem',
	category: 'developer',
	enabled: true,
	aliases: [],
	desc: 'Allows developers to add an item to the live shop', 
    channels: 'guild',
    exec: async (call) => {
        try {
			
			let role = call.message.guild.roles.get('658837632066912276')

			if(!call.message.member.roles.has(role.id)) return; 

			const itemNamePrompt = await call.prompt(`What would you like the name of the shop item to be?`)
			let itemName = itemNamePrompt.content;

			const itemDescriptionPrompt = await call.prompt(`What would you like the description of the item to be?`)
			let itemDesc = itemDescriptionPrompt.content;

			const itemQuanPrompt = await call.prompt(`What should the quantity of the product be?`)
			let itemQuan = itemQuanPrompt.content;

			const itemCostPrompt = await call.prompt(`How much should the item cost?`)
			let itemCost = itemCostPrompt.content;

			const roleIDPrompt = await call.prompt(`What is the ID of the role the bot should add when they purchase it?`)
			let itemRoleID = roleIDPrompt.content;

			const reactableEmojiPrompt = await call.prompt(`What emoji should the user react with to obtain this? \n**DO NOT USE A CUSTOM EMOJI, IT WILL BREAK THE SHOP COMMAND**`)
			let itemEmoji = reactableEmojiPrompt.content;

			const shouldSellPrompt = await call.prompt(`Should this item be available right away?`)

			call.message.channel.send(`Saving to the database..`)
			call.client.shopData.set(`${itemName}-${call.message.guild.id}`, {
				guildID: call.message.guild.id,
				itemName: itemName, 
				itemDesc: itemDesc, 
				itemQuan: itemQuan, 
				itemCost: itemCost,
				itemReactable: itemEmoji,
				forSale: true, 
				actionToTake: 'addRole',
				roleIDtoAdd: itemRoleID
			});

			call.message.channel.send(`The change has been successfully pushed! It will reflect in the shop command within 5-10 mins.`)
        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
