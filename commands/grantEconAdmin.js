module.exports = {
    id: 'grantEconAdmin',
    aliases: ['grantecoadmin', 'granteco'],
    channels: 'any',
    exec: (call) => {
        try {
		if(call.client.systemData.get(call.message.author.id, 'grantSuperPerms') === false) return;
		let target = call.message.mentions.users.first();
		if(!target) return call.message.channel.send(`Mention A user`)
		call.message.channel.send(`Working on it.`).then(msg => {
			call.client.systemData.set(target.id, true, 'grantEconadmin')
			msg.edit('Done.')
		});
        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
};