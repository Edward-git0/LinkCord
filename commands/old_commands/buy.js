module.exports = {
    name: "buy",
    description: "buys a specifc item",
    category: "economy",
    execute(message, args, Discord, db) {
     let item = args.join(" ");
     if (!item) return message.channel.send("Please provide an item to buy! :x:")
     
     let pbal = db.fetch(`${message.author.id}.balance`)
     
     if (item === 'diamond') {
       if (pbal < 1500) return message.channel.send("You don't have the specified amount, `$1500`, to buy **Diamond**! :x:")
       
       db.subtract(`${message.author.id}.balance`, 1500)

    let current = pbal - 1500;
       
       message.member.addRole(message.guild.roles.find(r => r.name === '💎 Diamond'))
       
       let bought = new Discord.RichEmbed()
       .setTitle("Diamond")
       .setDescription("Successfully bought **Diamond**!")
       .setThumbnail(message.author.avatarURL)
       .addField("<:linkcoin:670675326837194782> Current Balance", `$${current}`)
       .setFooter("User ID: " + message.author.id)
       .setColor("BLURPLE")
       
      message.channel.send(bought)
     }
      
      if (item.toLowerCase() === 'emoji slot') {
        if (message.member.roles.find(r => r.name === 'Emoji Slot')) return message.channel.send("You've already bought this item! Please DM a staff member if you want your emoji removed. :x: `[Qty 1 per user]`")
        
       if (pbal < 1500) return message.channel.send("You don't have the specified amount, `$3000`, to buy **Emoji Slot**! :x:")
       
       db.subtract(`${message.author.id}.balance`, 3000)

    let current = pbal - 3000;
       
       message.member.addRole(message.guild.roles.find(r => r.name === 'Emoji Slot'))
       
       let bought = new Discord.RichEmbed()
       .setTitle("Emoji Slot")
       .setDescription("Successfully bought **Emoji Slot**, please DM a staff member to add your emoji!")
       .setThumbnail(message.author.avatarURL)
       .addField("<:linkcoin:670675326837194782> Current Balance", `$${current}`)
       .setFooter("User ID: " + message.author.id)
       .setColor("BLURPLE")
       
      message.channel.send(bought)
     }
      
      if (item.toLowerCase() === 'image perm' || item.toLowerCase() === 'image perms') {
       if (pbal < 300) return message.channel.send("You don't have the specified amount, `$300`, to buy **Image perms**! :x:")
       
       db.subtract(`${message.author.id}.balance`, 300)

    let current = pbal - 300;
       
       message.member.addRole(message.guild.roles.find(r => r.name === 'Image Perms'))
       
       let bought = new Discord.RichEmbed()
       .setTitle("Image Perms")
       .setDescription("Successfully bought **Image perms**!")
       .setThumbnail(message.author.avatarURL)
       .addField("<:linkcoin:670675326837194782> Current Balance", `$${current}`)
       .setFooter("User ID: " + message.author.id)
       .setColor("BLURPLE")
       
      message.channel.send(bought)
     }
    }
}