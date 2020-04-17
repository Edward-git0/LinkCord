module.exports = (client, reaction, user) => {
	console.log('bang')
    if (reaction.message.id === client.systemData.get('system', 'pingableReactionMessageID')) {
        let message = reaction.message

        let foundRole = client.matchableRoles.find(r => {
            return r.emoji === reaction.emoji.name
        });

        if (!foundRole)
            return;

        message.guild.member(user).removeRole(foundRole.roleToAdd, ['The user requested it be removed in #roles'])
        user.send(`I have removed the \`${foundRole.name}\` role from you!`)


    } else if (reaction.message.id === client.systemData.get('system', 'devCordReactionMessageID')) {
        let message = reaction.message

        let foundRole = client.matchableRoles.find(r => {
            return r.emoji === reaction.emoji.name
        });

        if (!foundRole)
            return;

        message.guild.member(user).removeRole(foundRole.roleToAdd, ['The user requested it be removed in #roles'])
        user.send(`I have removed the \`${foundRole.name}\` role from you!`)


    } else if (reaction.message.id === client.systemData.get('system', 'gameCordMessageReactionID')) {
        let message = reaction.message

        let foundRole = client.matchableRoles.find(r => {
            return r.emoji === reaction.emoji.name
        });

        if (!foundRole)
            return;

        message.guild.member(user).removeRole(foundRole.roleToAdd, ['The user requested it be removed in #roles'])
        user.send(`I have removed the \`${foundRole.name}\` role from you!`)


    }

}