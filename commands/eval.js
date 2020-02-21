/* eslint-disable no-mixed-spaces-and-tabs */
const discord = require('discord.js');
module.exports = {
	id: 'eval',
	desc: 'Allows the bot developer to execute JavaScript inside of Discord.',
	exec: (call) => {
		try {
			let role = call.message.guild.roles.get('658837632066912276')

			if(!call.message.member.roles.has(role.id)) return; 

			if(call.message.author.id === '370258372211245068') 
				return call.message.reply(`no anne`)
			let codein = call.args.join(' ');

			if (codein === 'message.author.send(bot.token)') return call.message.reply('no');

			if (!codein) return call.message.channel.send('Nothing was put in');

			let code = eval(codein);

			if (typeof code !== 'string')

				code = require('util').inspect(code);


			if (code.length > 2048) {
				call.message.reply(`could not fit *thats what she said*`);
			}

			let embed = new discord.RichEmbed()

				.setAuthor('✅')

				.setColor('GREEN')

				.setDescription(`\`\`\`js\n${code}\n\`\`\``)

				.setFooter(`Took About 0 Seconds.`);

			call.message.channel.send(embed);

		} catch (e) {

		   if (e.length > 2048) {

				call.message.reply(`could not fit *thats what she said*`);
			}

			let errorembed = new discord.RichEmbed()

		   .setTitle(':x:')

		   .setDescription(`\`\`\`js\n${e}\n\`\`\``)

		   .setColor('RED');

		   call.message.channel.send(errorembed);

		}
	}
};