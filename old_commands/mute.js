module.exports = {
    name: "mute",
    description: "Mute a user",
    category: "moderation",
    execute(message, args, ms, Discord) {
        if (!message.member.hasPermission(["MANAGE_MESSAGES"]))
        return message.channel.send("You can't perform this command. ❌");
      let user = message.mentions.users.first();
      let time = args[1];
      let reason = args.splice(2, args.length).join(" ");
      if (!time)
        return message.channel.send(
          "Specify a time! :x: `,mute {user} {time} {reason}`"
        );
      if (!reason)
        return message.channel.send(
          "Specify a reason! :x: `,mute {user} {time} {reason}`"
        );
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.addRole("660311773613654019").then(() => {
            const logs = message.guild.channels.find(ch => ch.name === "logs");
            message.delete();

            const logsembed = new Discord.RichEmbed()
            .setTitle("Logs")
            .setColor("BLURPLE")
            .addField(
              `Muted`,
              `${message.author} muted ${user} for reason\n\`\`\`${reason}\`\`\`\nDuration: ${time} :white_check_mark:`
            )
            .setThumbnail(message.author.avatarURL)
            .setTimestamp()
            .setFooter(`User: ${message.author.username}`, message.author.avatarURL);
            logs.send(logsembed);

            user.send(
              "**You were muted in LinkCord because:** \n```\n" +
                reason +
                "\n``` \n`By: " +
                message.author.tag +
                "`"
            );
            setTimeout(function() {
              member.removeRole("660311773613654019");
              user.send("**You were unmuted in LinkCord! :tada:**");
              let logsembed = new Discord.RichEmbed()
              .setTitle("Logs")
              .setColor("BLURPLE")
              .addField(
              `Unmuted`,
              `${user.tag} was unmuted! :white_check_mark:`
              )
              .setThumbnail(user.avatarURL)
              .setTimestamp()
              .setFooter(`User: ${user}`, user.avatarURL);
              logs.send(logsembed);
            }, ms(time));
          });
        } else {
          message.channel.send("Couldn't find that user! :x:");
        }
      } else {
        message.channel.send(
          "Specify a user! :x: `,mute {user} {time} {reason}`"
        );
      }
    }
}