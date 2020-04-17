module.exports = {
    name: "rob",
    description: "rob a specificed user",
    category: "economy",
    execute(message, args, Discord, db) {
      let user = message.mentions.users.first();
      if (!user) return message.channel.send("Specify a user! :x:")
      let hisbal = db.fetch(`${user.id}.balance`);
      let mybal = db.fetch(`${message.author.id}.balance`);
      var am = Math.floor(Math.random() * Math.floor(200))
      
      if (hisbal < 200) {
        am = Math.floor(Math.random() * Math.floor(30))
      }

      
      if (hisbal <= 0) return message.channel.send("This user has a balance that's less than 0! :x:");
      if (am === 0 || am < 0) {
        am = 1;
      }
      var left = hisbal - am;
      var right = mybal + am;
      var poss = Math.random();
      if (mybal < 50) return message.channel.send("You need `$50` LinkCoins to rob someone! :x:")
      if (poss < 0.75) {
        const notrob = new Discord.RichEmbed()
        .setTitle("Failed")
        .setDescription(`You failed in robbing **${user.username}** and lost \`$50\` coins! :x:`)
        .setTimestamp()
        .setColor("RED")
        .setThumbnail(user.avatarURL)
        db.subtract(`${message.author.id}.balance`, 50)
        message.channel.send(notrob)
      } else {
        const robbed = new Discord.RichEmbed()
        .setTitle("Robbed")
        .setDescription("You successfully robbed $" + `${am}` + ` from **${user.username}**! :moneybag:`)
        .addField("<:linkcoin:670675326837194782> Current Balance", `$${right}`)
        .addField("<:linkcoin:670675326837194782> User's Balance", `$${left}`)
        .setTimestamp()
        .setColor("BLURPLE")
        .setThumbnail(message.author.avatarURL)
        
        if ((`${user.id}.balance` - am) < 0) {
          db.add(`${user.id}.balance`, 10);
        }
        
        db.subtract(`${user.id}.balance`, am)
        
        db.add(`${message.author.id}.balance`, am)
        message.channel.send(robbed)
      }
    }
}