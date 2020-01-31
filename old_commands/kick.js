module.exports = {
    name: "kick",
    description: "Kick users",
    category: "moderation",
    execute(message, args, Discord) {
        if (!message.member.hasPermission(["KICK_MEMBERS"]))
        return message.channel.send("You can't perform this command. ❌");
        let reason = args.splice(2, args.length).join(" ");
  
        const user = message.mentions.users.first();
        if (user) {
          const member = message.guild.member(user);
          if (member) {
            if (!reason) return message.channel.send("Provide a reason. :x:");
  
            const kickembed = new Discord.RichEmbed()
              .setTitle("Kicked")
              .setDescription(
                "You were kicked from " +
                  message.guild +
                  " because: \n```\n" +
                  reason +
                  "\n```"
              )
              .setTimestamp()
              .setFooter(
                "Kicked by: " + message.author.tag,
                message.author.avatarURL
              )
              .setColor("BLURPLE");
  
            user.send(kickembed)
            message.channel.send(kickembed)
                member.kick({ reason: reason }).then(() => {
                    const logs = message.guild.channels.find(ch => ch.name === "logs");
                    const logsembed = new Discord.RichEmbed()
                    .setTitle("Logs")
                    .setColor("BLURPLE")
                    .addField(
                    `Kicked`,
                    `${message.author} kicked ${user} for reason\n\`\`\`${reason}\`\`\`\n :white_check_mark:`
                    )
                    .setThumbnail(message.author.avatarURL)
                    .setTimestamp()
                    .setFooter(`User: ${message.author.username}`, message.author.avatarURL);
                    logs.send(logsembed);
            });
          } else {
            message.reply("Can't find that user. ❌");
          }
        } else {
          message.reply("Specify a user! ❌");
        }
    }
}