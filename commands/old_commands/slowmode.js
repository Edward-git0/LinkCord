module.exports = {
    name: "slowmode",
    description: "Enable slowmode",
    category: "moderation",
    execute(message, args, Discord) {
        let dur = args[0];

        if (!dur) return message.channel.send("Specify a # of seconds! :x:");
    
        message.channel.setRateLimitPerUser(dur).catch(() => {
          message.channel.send("Unable to change slowmode. :x:");
        });
    
        let logs = message.guild.channels.find(ch => ch.name === "logs");
    
        let logsembed = new Discord.RichEmbed()
          .setTitle("Logs")
          .setColor("BLURPLE")
          .addField(
            `Slowmode`,
            `${message.author} changed the slowmode in ${message.channel}! :white_check_mark:`
          )
          .setThumbnail(message.author.avatarURL)
          .setTimestamp()
          .setFooter(`User: ${message.author.username}`, message.author.avatarURL);
    
        message.channel
          .send("Successfully changed the slowmode. :white_check_mark:")
        message.delete(50).catch(console.error);
    }
}