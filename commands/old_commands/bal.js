module.exports = {
    name: "bal",
    description: "Checks your balance",
    category: "economy",
    execute(message, args, Discord, db) {
      let user = message.mentions.users.first();
      
    let mymon = db.fetch(`${message.author.id}.balance`)
    if (mymon == null) mymon = 0;
      
      if (!user) {
        const moneyembed = new Discord.RichEmbed()
        .setTitle("Balance")
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .setColor("BLURPLE")
        .setFooter(`User ID: ${message.author.id}`)
        .addField("<:linkcoin:670675326837194782> LinkCoins", `$${mymon}`)
        
        message.channel.send(moneyembed)
      } else {
      let mon = db.fetch(`${user.id}.balance`)
      if (mon == null) mon = 0;
      const moneyembed = new Discord.RichEmbed()
      .setTitle("Balance")
      .addField("<:linkcoin:670675326837194782> LinkCoins", `$${mon}`)
      .setTimestamp()
      .setColor("BLURPLE")
      .setThumbnail(user.avatarURL)
      .setFooter(`User ID: ${user.id}`)
      
    message.channel.send(moneyembed)
    }
}
}