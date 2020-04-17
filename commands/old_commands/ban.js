module.exports = {
    name: "ban",
    description: "Ban Hammer",
    category: "moderation",
    execute(message, args, ms, Discord) {
        if (!message.member.hasPermission(["BAN_MEMBERS"]))
        return message.channel.send("You can't perform this command. ❌");
      let time = args[1];
      let reason = args.splice(2, args.length).join(" ");
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          if (!time)
            return message.channel.send(
              "Provide a time. :x: `,ban {user} {time} {reason}`"
            );
          if (!reason)
            return message.channel.send(
              "Provide a reason. :x: `,ban {user} {time} {reason}`"
            );
          let mstime = args[1];

          const banembed = new Discord.RichEmbed()
          .setTitle("Banned")
          .setDescription(
            "You were banned from " +
              message.guild +
              " for " +
              args[1] +
              " because: \n```\n" +
              reason +
              "\n```"
          )
          .setTimestamp()
          .setColor("BLURPLE")
          .setFooter(
            "Banned by: " + message.author.tag,
            message.author.avatarURL
          );
          user.send(banembed)
          message.channel.send(banembed)
            member.ban({ reason: reason }).then(() => {
                const logs = message.guild.channels.find(ch => ch.name === "logs");
                const logsembed = new Discord.RichEmbed()
                .setTitle("Logs")
                .setColor("BLURPLE")
                .addField(
                `Banned`,
                `${message.author} banned ${user} for reason\n\`\`\`${reason}\`\`\`\nDuration: ${args[1]} :white_check_mark:`
                )
                .setThumbnail(message.author.avatarURL)
                .setTimestamp()
                .setFooter(`User: ${message.author.username}`, message.author.avatarURL);
                logs.send(logsembed);
          })
          if (time !== "perm") {
            setTimeout(function() {
              message.guild.unban(member.id).then(() => {
                const logs = message.guild.channels.find(ch => ch.name === "logs");
                const logsembed = new Discord.RichEmbed()
                .setTitle("Logs")
                .setColor("BLURPLE")
                .addField(
                  `Unbanned`,
                  `Unbanned ${user} :white_check_mark:`
                )
                .setThumbnail(user.avatarURL)
                .setTimestamp()
                .setFooter(`User: ${user.username}`, user.avatarURL);
                logs.send(logsembed);
              });
            }, ms(time));
          }
        } else {
          message.reply("Can't find that user. ❌");
        }
      } else {
        message.reply("Specify a user! ❌");
      }
    }
}