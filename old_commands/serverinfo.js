module.exports = {
    name: "serverinfo",
    description: "Information about the server",
    category: "general",
    execute(message, args, Discord) {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
          }
          const serverbed = new Discord.RichEmbed()
            .setTitle("Server Information")
            .addField("Name", message.guild.name, true)
            .addField("Owner: ", `Edward`, true)
            .addField("Region", `:flag_us: US East`, true)
            .addField(
              "Members: ",
              `${message.guild.members.filter(member => !member.user.bot).size}`,
              true
            )
            .addField(
              "Bots: ",
              `${message.guild.members.filter(member => member.user.bot).size}`,
              true
            )
            .addField("Channels: ", message.guild.channels.size, true)
            .addField("Roles: ", message.guild.roles.size, true)
            .addField(
              "Created: ",
              `${message.channel.guild.createdAt
                .toUTCString()
                .substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`
            )
            .setThumbnail(message.guild.iconURL)
            .setTimestamp()
            .setFooter("LinkCord")
            .setColor("BLURPLE");
      
          message.channel.send(serverbed);
    }
}