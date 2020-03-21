const Discord = require('discord.js')
module.exports = async (client, reaction, user) => {
	
  
  if(reaction.message.id === client.systemData.get('system', 'pingableReactionMessageID')) {
    let message = reaction.message

    let foundRole = client.matchableRoles.find(r => {
      return r.emoji === reaction.emoji.name
    });

    if(!foundRole)
      return;
    
    message.guild.member(user).addRole(foundRole.roleToAdd, ['The user requested it in #roles'])
    user.send(`I have added the \`${foundRole.name}\` role to you!`)
    
    
  } else if(reaction.message.id === client.systemData.get('system', 'devCordReactionMessageID')) {
    let message = reaction.message

    let foundRole = client.matchableRoles.find(r => {
      return r.emoji === reaction.emoji.name
    });

    if(!foundRole)
      return;
    
    message.guild.member(user).addRole(foundRole.roleToAdd, ['The user requested it in #roles'])
    user.send(`I have added the \`${foundRole.name}\` role to you!`)
    
    
  } else if(reaction.message.id === client.systemData.get('system', 'gameCordMessageReactionID')) {
    let message = reaction.message

    let foundRole = client.matchableRoles.find(r => {
      return r.emoji === reaction.emoji.name
    });

    if(!foundRole)
      return;
    
    message.guild.member(user).addRole(foundRole.roleToAdd, ['The user requested it in #roles'])
    user.send(`I have added the \`${foundRole.name}\` role to you!`)
    
    
  } 







	// const message = reaction.message;
  //   if (reaction.emoji.name !== '⭐') return;
  //   if (message.author.bot) return message.channel.send(`${user}, you cannot star bot messages.`);
  //   const starChannel = message.guild.channels.find(channel => channel.name === 'starboard')
  //   if (!starChannel) return message.channel.send(`It appears that you do not have a channel.`); 
  //   const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
  //   const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
  //   if (stars) {
  //     const star = /^⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
  //     const foundStar = stars.embeds[0];
  //     const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : '';
  //     const embed = new Discord.RichEmbed()
  //       .setColor(foundStar.color)
  //       .setDescription(foundStar.description)
  //       .setAuthor(message.author.tag, message.author.displayAvatarURL)
  //       .setTimestamp()
  //       .setFooter(`⭐ ${parseInt(star[1])+1} | ${message.id}`)
  //       .setImage(image);
  //     const starMsg = await starChannel.fetchMessage(stars.id);
  //     await starMsg.edit({ embed });
  //   }
  //   if (!stars) {
  //     const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : '';
  //     if (image === '' && message.cleanContent.length < 1) return message.channel.send(`${user}, you cannot star an empty message.`);
  //     const embed = new Discord.RichEmbed()
  //       .setColor(15844367)
  //       .setDescription(message.cleanContent)
  //       .setAuthor(message.author.tag, message.author.displayAvatarURL)
  //       .setTimestamp(new Date())
  //       .setFooter(`⭐ 1 | ${message.id}`)
  //       .setImage(image);
  //     await starChannel.send({ embed });
  //   }
  };