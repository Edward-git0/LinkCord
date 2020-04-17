module.exports = {
  name: "shop",
  description: "the shop",
  category: "economy",
  execute(client, message, args, Discord, db) {
    const w = new Discord.RichEmbed()
      .setTitle("<:linkcoin:670675326837194782> Shop")
      .addField("Diamond", "Diamond [Qty ∞] - 1,500 LinkCoins")
      .addField("Image Perms", "Image Perms [Qty ∞] - 300 LinkCoins")
    .addField("Emoji Slot", "Emoji Slot [Qty 1 per :man:] - 3000 LinkCoins")
      .setTimestamp()
      .setColor("BLURPLE")
      .setFooter("LinkCord")
      .setThumbnail(client.user.avatarURL);

    message.channel.send(w);
  }
};
