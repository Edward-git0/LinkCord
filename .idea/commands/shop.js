const Discord = require('discord.js');
const ms = require('ms')
module.exports = {
    id: 'shop',
    aliases: ['buythings', 'linkcoinshop', 'edward', 'store'],
    channels: 'guild',
    category: 'public',
    enabled: true,
    desc: '[PROMPT] ~ Displays the LinkCord shop, where you can buy server upgrades.',
    exec: async (call) => {
        try {
            let linkicon = call.client.emojis.get('660886312798257162');
            let usersDMs = await call.message.author.createDM();
            let filter = await call.client.shopData.filter(find => {
                return find.guildID === call.message.guild.id & find.forSale === true
            });
            let possibleEmojis = [];
            filter.forEach(findReactions => {
                possibleEmojis.push(findReactions.itemReactable)
            })

            let reactionFilter = (reaction, user) => {
                return possibleEmojis.includes(reaction.emoji.name) && user.id === call.message.author.id
            }

            const linkCoin = call.client.emojis.get('670675326837194782');


            if (filter.size === 0) return call.message.channel.send(`There are no items for sale right now.`)


            let embedDesc = '';
            filter.forEach(found => {
                embedDesc += `${found.itemReactable}** __${found.itemName}__** \nDescription: ${found.itemDesc} \nCost: ${found.itemCost} ${linkCoin} \nQuantity: ${found.itemQuan} \n\n`
            });



            const shopEmbed = new Discord.RichEmbed()
                .setTitle(`${linkCoin} LinkCoins Shop`)
                .setColor('BLURPLE')
                .setThumbnail(call.client.user.avatarURL)
                .setFooter('Cancel this prompt by reacting with 🗑️. This prompt will last 3 mins.')
                .setDescription(embedDesc);
            let instructions = await call.message.channel.send(`Click on the reactions below to purchase.`)
            let embedMessage = await call.message.channel.send(shopEmbed)


            possibleEmojis.forEach(emojis => {
                embedMessage.react(emojis)
            });

            possibleEmojis.push('🗑️')
            embedMessage.awaitReactions(reactionFilter, {
                    max: 1,
                    time: 180000
                })
                .then(async collected => {
                    let collectedEmoji = collected.first().emoji.name;
                    let userData = call.client.econData;
                    let shopData = call.client.shopData;
                    if (collectedEmoji === '💎') {
                        call.message.reply(`Purchasing the Diamond rank...`).then(msg => {
                            if (userData.get(`${call.message.author.id}-${call.message.guild.id}`, 'linkCoins') < shopData.get('Diamond-658680354378481675', 'itemCost')) {
                                return msg.edit(`You don't have enough LinkCoins to complete this purchase.`)
                            }
                            if(call.message.member.roles.has(call.message.guild.roles.find(r => r.name === '💎 Diamond').id))
                                return msg.edit(`${call.client.emojis.get('660252757583855638')} You already have **💎 Diamond**.`)
                            call.client.econData.math(`${call.message.author.id}-${call.message.guild.id}`, '-', 1500, 'linkCoins')

                            call.message.member.addRole(shopData.get('Diamond-658680354378481675', 'roleIDtoAdd'), `${call.message.author.tag} Purchased Diamond`)

                        let tbhembed = new Discord.RichEmbed()
                        .setTitle(`${linkicon} **Thank you for your purchase of the :gem: Diamond rank** ${linkicon}`)
                        .setDescription(`You just purchased :gem: Diamond from the LinkCord shop for \`1500\` ${linkCoin} \nYour balance is now \`${call.client.econData.get(`${call.message.author.id}-${call.message.guild.id}`, 'linkCoins')}\` ${linkCoin}`)
                        .setFooter(`Thanks for your purchase! ~ LinkCord Shop`)
                        .setColor('BLURPLE')
                        .setTimestamp();

                        msg.edit(tbhembed)
                        tbhembed.setFooter(`Thanks for your purchase - LinkCord shop ~ ❗ Keep this DM as proof of purchase ❗`)
                        call.message.author.send(tbhembed)

                        });
                    } else if (collectedEmoji === '🖼️') {
                        
                        if(call.client.econData.get(`${call.message.author.id}-${call.message.guild.id}`, 'linkCoins') < 700)
                            return call.message.reply(`You cannot afford this item! You need \`${700 - call.client.econData.get(`${call.message.author.id}-${call.message.guild.id}`, 'linkCoins')}\` ${linkCoin} more!`)
                        
                        let role = call.message.guild.roles.find(r => r.name === 'Image Perms')
                        if(call.message.member.roles.has(role.id))
                            return call.message.channel.send(`${call.client.emojis.get('660252757583855638')} You already have **Image Perms**.`)

                        if(!role)
                            return call.message.reply(`Sorry, this item became unavailable during the prompt.. Your LinkCoins have been returned to you.`)
                        
                        call.client.econData.math(`${call.message.author.id}-${call.message.guild.id}`, '-', 700, 'linkCoins')
                        call.message.member.addRole(role.id, `The user bought it from the Linkcord shop.`).catch(err => {
                            call.message.reply(`I couldn't complete the purchase of \`Image Perms\` for you. \nYour **700** ${linkCoin} has been returned to you.`)
                            call.client.econData.math(`${call.message.author.id}-${call.message.guild.id}`, '+', 700, 'linkCoins')
                            return;
                        })

                        let tbhembed = new Discord.RichEmbed()
                        .setTitle(`${linkicon} **Thank you for your purchase of Image Perms!** ${linkicon}`)
                        .setDescription(`You just purchased Image perms from the LinkCord shop for \`700\` ${linkCoin} \nYour balance is now \`${call.client.econData.get(`${call.message.author.id}-${call.message.guild.id}`, 'linkCoins')}\` ${linkCoin}`)
                        .setFooter(`Thanks for your purchase! ~ LinkCord Shop`)
                        .setColor('BLURPLE')
                        .setTimestamp();

                        call.message.channel.send(tbhembed)
                        tbhembed.setFooter(`Thanks for your purchase - LinkCord shop ~ ❗ Keep this DM as proof of purchase ❗`)
                        call.message.author.send(tbhembed)
                        
                    } else if(collectedEmoji === '🗑️') {
                        embedMessage.delete()
                        instructions.delete()
                        call.message.channel.send(`You reacted with the 🗑️ reaction. The prompt is now canceled.`)
                    } else if(collectedEmoji === '🙂') {
                        if(call.client.econData.get(`${call.message.author.id}-${call.message.guild.id}`, 'linkCoins') < 300)
                            return call.message.reply(`You cannot afford to buy!`)
                        
                        let dmRecieptEmbed = new Discord.RichEmbed()
                        .setTitle(`Your purchase of Custom Nickname`)
                        .setDescription(`Congrats! You just purchased \`Custom Nickname\` in LinkCord shop!`)
                        .setFooter(`LinkCord Shop ~ Keep this message as a proof of purchase.`, call.message.author.avatarURL)
                        .setColor('BLURPLE')
                        .setTimestamp();

                        let name = await call.prompt('What would you like your nickname to be?', {
                            time: ms('5m')
                        });

                        if(name.content.length > 32) {
                            name = await call.prompt(`What would you like your nickname to be? \n**Please make sure it is less than 32 characters.**`, {
                                time: ms('5m')
                            })
                        }
                        if(name.content.length > 32) {
                            name = await call.prompt(`What would you like your nickname to be? \n**Please make sure it is less than 32 characters.**`, {
                                time: ms('5m')
                            })
                        }
                        if(name.content.length > 32) {
                            name = await call.prompt(`What would you like your nickname to be? \n**Please make sure it is less than 32 characters.**`, {
                                time: ms('5m')
                            })
                        }
                        if(name.content.length > 32) {
                            name = await call.prompt(`What would you like your nickname to be? \n**Please make sure it is less than 32 characters.**`, {
                                time: ms('5m')
                            })
                        }

                        call.client.econData.math(`${call.message.author.id}-${call.message.guild.id}`, '-', 300, 'linkCoins')
                        call.message.member.setNickname(name.content, ['The user bought it from the LinkCord store.']).catch(err => {
                            call.message.reply('I was unable to change your name. Your 300 LinkCoins has been returned to you.')
                            call.client.econData.math(`${call.message.author.id}-${call.message.guild.id}`, '+', 300, 'linkCoins')
                            return;
                        });
                        let tbhembed = new Discord.RichEmbed()
                        .setTitle(`${linkicon} Thank you for your purchase of Custom Nickname! ${linkicon}`)
                        .setDescription(`You just purchased a custom nickname from the LinkCord shop for 300 ${linkCoin} \nYour balance is now **${call.client.econData.get(`${call.message.author.id}-${call.message.guild.id}`, 'linkCoins')}** ${linkCoin}`)
                        .setFooter(`Thanks for your purchase! ~ LinkCord Shop`)
                        .setColor('BLURPLE')
                        .setTimestamp();

                        call.message.channel.send(tbhembed)
                        call.message.author.send(dmRecieptEmbed)
                    } else if (collectedEmoji === '🛃') {
                        let searchForExistingCoolDown = call.client.tempData.find(search => {
                            return search.userID === call.message.author.id && search.dataType === 'EMOJI-ENTRY'
                        });

                        if (searchForExistingCoolDown === false || !searchForExistingCoolDown) {
                            call.prompt(`Please reply an **IMAGE ATTACHMENT** of the emoji you would like to have`, {
                                time: ms('5m'),
                                channel: usersDMs
                            }).then(emoji => {

                                call.prompt(`What should the name be? \nDue to Discord Limitations, the emoji name must be less than 32 characters`, {
                                    time: ms('5m'),
                                    channel: usersDMs
                                }).then(name => {
                                    let emojiImage = emoji.attachments.first().url
                                    if (name.length > 32) {
                                        return call.message.author.send(`Prompt Cancelled. Please re-run the command with a nme less than 32 characters long.`)
                                    }

                                    let approvalEmebed = new Discord.RichEmbed()
                                        .setTitle(`${call.message.author.tag} wants to add an emoji with the name of ${name.content}`)
                                        .setImage(emojiImage)
                                        .setColor('BLURPLE')
                                        .setFooter(`approve with ${call.prefixUsed}approveemoji ${call.message.author.id} or ${call.prefixUsed}denyemoji ${call.message.author.id} [reason]`)
                                        .setTimestamp();
                                    call.client.tempData.set(call.message.author.id, {
                                        dataType: 'EMOJI-ENTRY',
                                        cooldown: true,
                                        userName: call.message.author.tag,
                                        userID: call.message.author.id,
                                        imageURL: emojiImage,
                                        emojiName: name.content
                                    })
                                    call.client.channels.get('684183897063424014').send(approvalEmebed);
                                    call.message.author.send(`I've submitted your emojji for review. You will see a DM from me if it has been approved.`)
                                });
                            })


                            return;
                        }
                        if (searchForExistingCoolDown.cooldown === true)
                            return call.message.reply(`You can only submit an emoji for use once every 30 days! \n*Please note: It could take up to 10 mins for a cooldown to refresh*`)
                        call.message.reply(`Prompt will continue in your DM's`)
                    }



                });




        } catch (error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
};