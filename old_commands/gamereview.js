module.exports = {
  name: "gamereview",
  description: "gamereview",
  category: "moderation",
  execute(message, args, Discord) {
    if(!message.member.roles.has("660251316563607584")) {
      return message.reply("You cannot run this command! :x:");
    }
    function getValues() {
      if (args.indexOf("[[") !== "-1") {
        const start = args.indexOf("[[");
        const end = args.indexOf("]]", start + 2);
        const value = args.substring(start + 2, end);
        args = args.substring(end+1, args.length);
        console.log(start, end, value, args);
        return value;
      }
    }
    const title = getValues();
    const description = getValues();
    const pros = getValues();
    const cons = getValues();
    if(!title || !description) {
      return message.reply("Please include a title and description. e.g. \`,gamereview [[Title]] [[Description]]\`");
    }
    let image = "";
    if(message.attachments.size !== 0) {
      image = message.attachments.first().url;
    }
    
    const sentembed = new Discord.RichEmbed()
    .setDescription("Successfully posted! :white_check_mark:")
    .setTimestamp();
    
    let embed = new Discord.RichEmbed()
      .setTitle(title)
      .setDescription(description)
      .setImage(image || null)
      .setFooter("Review by: " + message.author.username)
      .setThumbnail(message.author.avatarURL)
      .setColor("BLURPLE")
      .setTimestamp();
    if(pros !== "]") {
      embed.addField("Pros", pros, true);
    } // that actually jmight work
    if(cons !== "]") {
      embed.addField("Cons", cons, true);
    }
    message.guild.channels.get("667561271582785536").fetchWebhooks().then(webhook => {
      let hookfind = webhook.find(w => w.name === "Game Review");
      if(!hookfind) {
        return message.reply("Error posting review. :x:");
      }
      const role = message.channel.guild.roles.find(r => r.name === "🎮 Review Ping"); // in the next update we wont be able to use 'name', "name" rip
      role.setMentionable(true, "Review posted");
      hookfind.send("<@&670718883304570891>").then(() => {
        role.setMentionable(false, "bye");
        hookfind.send(embed).then(() => {
          message.channel.send(sentembed).then((s) => {
            s.delete(1000);
          })
          //message.delete(1000);
        })
      })
    });
  }
};
