const Discord = require('discord.js');
module.exports = {
    id: 'addshopitem',
    aliases: [],
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

			call.message.channel.send(`Saving to the database..`)
			call.client.shopData.set(call.message.guild.id, {
				guildID: call.message.guild.id,
				itemName: itemName, 
				itemDesc: itemDesc, 
				itemQuan: itemQuan, 
				itemCost: itemCost,
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
