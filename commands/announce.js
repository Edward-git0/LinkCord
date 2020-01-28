module.exports = {
    name: "announce",
    description: "Make announcements",
    category: "moderation",
    execute(message, args, Discord) {
        if (!message.author.id == "598513581033521152") {
            if (!message.member.hasPermission("MANAGE_MESSAGES"))
              return message.channel
                .send("You can't perform this command. ❌")
                .then(msg => {
                  msg.delete(5000);
                });
            }
        
            const sayMessage = args.join(" ");
            if (!sayMessage)
              return message.channel.send(
                "Please provide a message for your announcement! :x:"
              );
        
          
                let embed24 = false;
              if(message.attachments.size > 0) {
                embed24 = new Discord.RichEmbed()
                .setFooter("Prompted by " + message.author.tag, message.author.avatarURL)
                .setDescription(sayMessage)
                .setColor("BLURPLE")
                .setTimestamp()
                .setThumbnail(message.attachments.first().url);
              } else {
                embed24 = new Discord.RichEmbed()
                .setFooter("Prompted by " + message.author.tag, message.author.avatarURL)
                .setDescription(sayMessage)
                .setColor("BLURPLE")
                .setTimestamp();
              }
        
            let logs = message.guild.channels.find(ch => ch.name === "logs");
        
            let logsembed = new Discord.RichEmbed()
              .setTitle("Logs")
              .setColor("BLURPLE")
              .addField(
                `Announce`,
                `${message.author} announced a message in ${message.channel}! :white_check_mark:`
              )
              .setThumbnail(message.author.avatarURL)
              .setTimestamp()
              .setFooter(`User: ${message.author.username}`, message.author.avatarURL);
        
            message.channel.send(embed24).then(messages => logs.send(logsembed).then(m => message.delete(500).catch(console.error)));
            //message.delete(1000).catch(console.error);
    }
}