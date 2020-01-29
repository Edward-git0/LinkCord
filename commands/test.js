module.exports = {
	name: "test",
	description: "posts a test",
	category: "general",
	async execute(client, message, args, Discord, cooldowns) {
	  message.channel.send(`ok boomer`)
	  
	}
  };
  