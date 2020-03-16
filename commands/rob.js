const Discord = require('discord.js');
module.exports = {
    id: 'rob',
    aliases: [],
    desc: 'Allows you to rob another user of their LinkCoins. You must have at least 25 LinkCoins to rob someone.',
    category: 'public',
    enabled: true, 
    channels: 'guild',
    exec: (call) => {
        try {
		
		let target = call.message.guild.members.get((call.args[0] || '').replace(/\D+/g, ''));
		//Check if there is no target
		if(!target)
			return call.message.channel.send(`You have to find someone to rob first!`)
		//check If the user is robbing themselves.
		if(target.id === call.message.author.id)
			return call.message.channel.send(`Its illogical to rob yourself. Why would you even consider that?`)
		//check if the user they are robbing is a bot
		if(target.user.bot) 
			return call.message.channel.send(`Bots have no money for you, move on!`)
		
		//Define the keys for the database so I don't have to write them over and over and over and over and over and over and over and over and over and over and over
		let mKey = `${call.message.author.id}-${call.message.guild.id}`
		let tKey = `${target.id}-${call.message.guild.id}`
		let targetBalance;
		
		// Try to get the targets balance from the database, if that fails they don't have any userdata and must chat before being robbed.
		try {
			targetBalance = call.client.econData.get(tKey, 'linkCoins')
		} catch (error) {
			return call.message.channel.send(`That user has nothing to rob! Tell them to chat a little.`)
		}


		//Calculate prob if they arent members 
			//PUT HERE SO IT DOESNT GET OVERWRITTEN
			//TO DO
		if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === '💎 Diamond'))) {
			//Calc prob if they are diamond
			//To do
		}
		if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === '💎 Diamond+'))) {
			//Calc prob if they are diamond+
			//To do
		}

        } catch(error) {
            let em = call.client.emojis.get('687791419766734930')
            call.message.channel.send(`${em} Something went wrong while this command was executing! It has been reported to the developer team and it will be fixed soon.`);
            console.log(error);
        }
    }
}; 
