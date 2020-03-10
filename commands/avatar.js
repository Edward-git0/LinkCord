module.exports = {
    id: 'avatar',
    aliases: ['showavatar'],
    desc: 'Shows you the mentioned users avatar.',
    category: 'public',
	enabled: true,
    channels: 'any',
    exec: (call) => {
        try {
			let targetPerson = call.message.mentions.users.first() || call.client.users.get(call.args[0])
			if(!targetPerson) targetPerson = call.message.author
			call.message.channel.send(targetPerson.avatarURL);
        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
