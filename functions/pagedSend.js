//Made in part by gt_c 
//Most additions from thetechguy61705

const { Collection } = require('discord.js');

function defaults(obj, objDef) {
	for (let [name, prop] of Object.entries(objDef))
		if (!(name in obj))
			obj[name] = prop;

	return obj;
}

const PAGED_SEND_DEFAULTS = {
	valuesPerPage: 3,
	allowFlip: true,
	bypassMultiple: false,
	joinWith: '\n',
	collectorOptions: {
		filter: () => true,
		time: 120000
	},
	startWith: '',
	endWith: ''
};

module.exports = function pagedSend(call, embed, options = {}) {
	defaults(options, PAGED_SEND_DEFAULTS);

	let range = options.valuesPerPage;
	let totalPages = Math.ceil(options.values.length / options.valuesPerPage);
	let page = 1;
	let isPaged = options.valuesPerPage < options.values.length;

	embed
		.setDescription(options.startWith + options.values.slice(0, range).join(options.joinWith) + options.endWith)
		.setFooter(`Page ${page}/${totalPages} - ${call.message.author.tag} (${call.message.author.id})`, call.message.author.displayAvatarURL);
	return new Promise((resolve) => {
		if (!call.commands._pagedRequests)
			call.commands._pagedRequests = new Collection();

		if (isPaged && !options.bypassMultiple) {
			if (call.commands._pagedRequests.has(call.message.author.id))
				return call.message.channel.send('You are currently in a paged prompt, please cancel your prompt (add the wastebasket 🗑 reaction to the prompt).');
			else
				call.commands._pagedRequests.set(call.message.author.id, null);
		}

		call.message.channel.send(embed).then(async (msg) => {
			if (options.valuesPerPage < options.values.length) {
				await msg.react('◀');
				await msg.react('▶');

				let collector = msg.createReactionCollector((r, u) => ['◀', '▶', '🗑'].includes(r.emoji.name) &&
						u.id === call.message.author.id &&
						(options.filter || (() => true))(r, u), options.collectorOptions);

				call.commands._pagedRequests.set(call.message.author.id, collector);

				collector.on('collect', (reaction) => {
					if (reaction.emoji.name === '🗑')
						return collector.stop();

					reaction.remove(call.message.author);

					if (reaction.emoji.name === '◀') {
						if (page !== 1) {
							page--;
							range -= options.valuesPerPage;
						} else if (options.allowFlip) {
							page = totalPages;
							range = Math.ceil(options.values.length / options.valuesPerPage) * options.valuesPerPage;
						}
					} else if (page !== totalPages) {
						page++;
						range += options.valuesPerPage;
					} else if (options.allowFlip) {
						page = 1;
						range = options.valuesPerPage;
					}

					embed
						.setDescription(options.startWith + options.values.slice(range - options.valuesPerPage, range).join(options.joinWith) + options.endWith)
						.setFooter(`Page ${page}/${totalPages} - ${call.message.author.tag} (${call.message.author.id})`, call.message.author.displayAvatarURL);
					msg.edit(embed);
				});

				collector.on('end', () => {
					call.commands._pagedRequests.delete(call.message.author.id);
					msg.edit('Interactive embed ended.');
				});
			}
			resolve(msg);
		});
	});
};