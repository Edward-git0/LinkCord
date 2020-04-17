module.exports = {
    name: "add",
    description: "adds money to a specific user",
    category: "economy",
    execute(message, args, Discord, db) {
      if (message.member.roles.find(r => r.name === 'Event Host') || message.member.roles.find(r => r.name === 'Administrator')) {
      
         let user = message.mentions.users.first();
      
        if (!user) return message.channel.send("Specify a user! :x:")
      
      let amount = (args[1])
      
      if (!amount || isNaN(amount)) return message.channel.send("Please enter a **valid** amount of money. :x:");
        
        db.add(`${user.id}.balance`, amount)
        message.channel.send("Successfully added $" + amount + ` to ${user.username}'s balance! <:linkcoin:670675326837194782>`)
      } else {
        message.channel.send("You can't perform this command! :x:")
      }
    }
}