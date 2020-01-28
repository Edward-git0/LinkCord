module.exports = {
    name: "purge",
    description: "Removes messages",
    category: "moderation",
    execute(message, args, Discord) {
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) {
            return message.channel
            .send("You can't perform this command! :x:")
            .then((msg) => {
                msg.delete(5000);
            });
        }
        if(!args.length) {
            return message.reply(
                "Please provide a number between 2 and 100 for the number of messages to delete. :x:"
            ); 
        }
        const deleteCount = parseInt(args[0], 10);
        if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
            return message.reply(
            "Please provide a number between 2 and 100 for the number of messages to delete. :x:"
            );
      }

      const logs = message.guild.channels.find(ch => ch.name === "logs");

      let logsembed = new Discord.RichEmbed()
      .setTitle("Logs")
      .setColor("BLURPLE")
      .addField(
        `Purge`,
        `${message.author} purged ${args[0]} messages in ${
          message.channel
        }! :white_check_mark:`
      )
      .setThumbnail(message.author.avatarURL)
      .setTimestamp()
      .setFooter(`User: ${message.author.username}`, message.author.avatarURL);
      const embed2 = new Discord.RichEmbed()
      .setTitle("Purge")
      .setDescription("Purge successful :white_check_mark:")
      .setColor("BLURPLE")
      .setTimestamp();
      message.channel
      .bulkDelete(deleteCount+1)
      .then(messages => { logs.send(logsembed);
        message.channel.send(embed2).then((msg) => {
          msg.delete(2000);
        })
      })
      .catch(error =>
        message.reply(`Couldn't delete messages because of: ${error}`)
      );
    },
}