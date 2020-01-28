module.exports = {
    name: "daily",
    description: "get your daily linkcoins",
    category: "economy",
    execute(message, args, Discord, db) {
   const daily = new Discord.RichEmbed()
   .setTitle("Daily")
   .setDescription("You just collected your daily `$150` LinkCoins! ")
   .setTimestamp()
   .setThumbnail(message.author.avatarURL)
   .setColor("BLURPLE")
   
   db.add(`${message.author.id}.balance`, 150)
   message.channel.send(daily)
  }
}