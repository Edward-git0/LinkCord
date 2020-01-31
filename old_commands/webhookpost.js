module.exports = {
	name: 'webhookpost',
	description: 'Sends a webhook post',
	category: "moderation",
	execute(message, args, Discord) {
    if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("You can't perform this command. :x:")
      let msg = args.join(" ");
      if (!msg) return message.author.send("Please type a message! :x:")
      message.channel.fetchWebhooks().then(webhook => {
        let hookfind = webhook.find(w => w.name === message.author.username);
        if (!hookfind) {
          message.channel.createWebhook(message.author.username, message.author.avatarURL)
          .then(webhook => {
            webhook.send(msg)
          })
        } else {
          hookfind.send(msg)
        }
      })
      message.delete();
	},
};