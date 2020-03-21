module.exports = async (client) => {
	client.channels.get('690660367105392721').fetchMessage(client.systemData.get('system', 'pingableReactionMessageID'))
	client.channels.get('690660367105392721').fetchMessage(client.systemData.get('system', 'devCordReactionMessageID'))
	client.channels.get('690660367105392721').fetchMessage(client.systemData.get('system', 'gameCordReactionMessageID'))
}