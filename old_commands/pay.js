module.exports = {
    name: "pay",
    description: "pays a specific user",
    category: "economy",
    execute(message, args, Discord, db) {
      let user = message.mentions.users.first();
      
      if (!user) return message.channel.send("Specify a user! :x:")
      let mon = db.fetch(`${message.author.id}.balance`)
      
    let am = (args[1])
    if (!am || isNaN(am)) return message.channel.send("Specify a **valid** amount! :x:")
      
    if (mon < am) return message.channel.send("You don't have enough to pay that user! :x:")
      
      db.subtract(`${message.author.id}.balance`, am)
      db.add(`${user.id}.balance`, am)
      
      message.channel.send("Successfully transferred " + `\`$${am}\`` + ` to ${user.username}! <:linkcoin:670675326837194782>`)
    }
}