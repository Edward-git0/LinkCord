module.exports = {
    name: "help",
    description: "Here to help!",
    category: "general",
    execute(message, args, Discord) {
        const help = new Discord.RichEmbed()
        .setTitle("Help")
        .addField(
          ",help fun",
          "Displays the fun module! Consists of commands such as `,hug` or `,kill`!"
        )
        .addField(
          ",help mod",
          "Displays the moderation module, this is for moderators! Commands include `,ban`, `,kick`, `,mute`, etc."
        )
        .addField(
          ",help general",
          "Displays a general/miscellaneous module. This is for random commands like `,ping`."
        )
        .setColor("BLURPLE")
        .setFooter("LinkCord")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/661294253707755521/661311666298028036/download.png"
        );
  
      let _module = args[0];
      if (!_module) return message.channel.send(help);
      if (_module === "fun") {
        const fun = new Discord.RichEmbed()
          .setTitle("Fun")
          .setDescription("**This is the Fun module. Commands include:**")
          .addField(",hug", "`,hug {user}`", true)
          .addField(",poke", "`,poke {user}`", true)
          .addField(",cuddle", "`,cuddle {user}`", true)
          .addField(",slap", "`,slap {user}`", true)
          .addField(",drown", "`,drown {user}`", true)
          .addField(",kill", "`,kill {user}`", true)
          .addField(",boxing", "`,boxing {user}`", true)
          .setTimestamp()
          .setColor("BLURPLE")
          .setFooter("LinkCord")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/661294253707755521/661311666298028036/download.png"
          );
  
        message.channel.send(fun);
      }
  
      if (_module === "general") {
        const general = new Discord.RichEmbed()
          .setTitle("General")
          .setDescription("**This is the General module. Commands include:**")
          .addField(",ping", "`,ping`", true)
          .addField(",serverinfo", "`,serverinfo`", true)
          .addField(",avatar", "`,avatar {optional: user}`", true)
          .addField(",post", "`,post -> {prompt}`", true)
          .addField(",ad", "`,ad -> {prompt}`", true)
          .setTimestamp()
          .setColor("BLURPLE")
          .setFooter("LinkCord")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/661294253707755521/661311666298028036/download.png"
          );
  
        message.channel.send(general);
      }
  
      if (_module === "mod") {
        const mod = new Discord.RichEmbed()
          .setTitle("Moderation")
          .setDescription("**This is the Moderation module. Commands include:**")
          .addField(",purge", "`,purge {amount}`", true)
          .addField(",slowmode", "`,slowmode {amount}`", true)
          .addField(",warn", "`,warn {user} {reason}`", true)
          .addField(",kick", "`,kick {user} {reason}`", true)
          .addField(",ban", "`,ban {user} {time} {reason}`", true)
          .addField(",mute", "`,mute {user} {time} {reason}`", true)
          .setTimestamp()
          .setColor("BLURPLE")
          .setFooter("LinkCord")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/661294253707755521/661311666298028036/download.png"
          );
  
        message.channel.send(mod);
      }
    }
}