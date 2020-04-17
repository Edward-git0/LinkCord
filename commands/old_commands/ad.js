module.exports = {
  name: "ad",
  description: "posts an advert",
  category: "general",
  async execute(client, message, args, Discord, cooldowns) {
    
    const guild = client.guilds.get("658680354378481675"); // 606205150100455424

    const now = Date.now();
    const usercooldown = cooldowns.get(`${message.author.id}_AD`);
    const cooldownAmount = 18000000;

    if (usercooldown) {
      const embed4 = new Discord.RichEmbed()
        .setTitle("Cooldown")
        .setDescription("You can only send a advertisement once every 5 hours!")
        .setColor("BLURPLE")
        .setTimestamp();
      return message.channel.send(embed4).then(msg => {
        msg.delete(3000);
      });
    }
    const channel1 = guild.channels.find(
      channel1 => channel1.name === "ad-approval" // ad-request
    );
    if (!channel1) return;

    message.channel.send("Direct messaging post prompt. :white_check_mark:");

    let firstMsg = await message.author.send(
      "Please provide a summary on what you are advertising! Say `cancel` to cancel! :white_check_mark:"
    );

    const filter = m => m.author.id === message.author.id;

    firstMsg.channel.awaitMessages(filter, { max: 1 }).then(async collected => {
      if (collected.first().content === "cancel") {
        return message.author.send("Prompt cancelled. :x:");
      }

      let ltcmessage = collected.first().content;

      let firstMsg2 = await message.author.send(
        "Please provide an image you would like to add! Say `cancel` to cancel! :white_check_mark:"
      );

      const filter2 = m => m.author.id === message.author.id;

      firstMsg2.channel
        .awaitMessages(filter2, { max: 1 })
        .then(async collected => {
          if (collected.first().content === "cancel") {
            return message.author.send("Prompt cancelled. :x:");
          }
        

          let ltcmessage2 = collected.first().attachments.first().url;
        
          const adembed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle("Advertisement")
            .addField("Body", ltcmessage)
            .setImage(ltcmessage2 || null);

          const channel2 = guild.channels.find(
            channel2 => channel2.name === "adverts" // ad
          );
          if (!channel2) return;

          const sendd = new Discord.RichEmbed()
            .setTitle("Post")
            .setDescription(
              "Your post has been sent for approval! :white_check_mark:"
            )
            .setColor("BLURPLE")
            .setTimestamp();

          const sendt = new Discord.RichEmbed()
            .setTitle("Post")
            .setDescription("Your post has been approved! :white_check_mark:")
            .setColor("BLURPLE")
            .setTimestamp();

          message.author.send("");

          message.author.send(
            "Say `send` to confirm your ad or `cancel` to cancel."
          );
          let confMsg = await message.author.send(adembed);

          const filter3 = m => m.author.id == message.author.id;
          confMsg.channel
            .awaitMessages(filter3, { max: 1 })
            .then(async collected => {
              if (collected.first().content === "cancel") {
                return message.author.send("Prompt cancelled. :x:");
              } else if (collected.first().content === "send") {
                message.author.send(sendd);
                cooldowns.push(`${message.author.id}_AD`, now);
                setTimeout(
                  () => cooldowns.delete(`${message.author.id}_AD`),
                  cooldownAmount
                );
                channel1.send(adembed).then(a => {
                  a.react("658780672756023317").then(() => {
                    a.react("658780673078722579");
                  });
                  // 658361275746746398

                  // 65836123405955896
                  const filter = (reaction, user) =>
                    reaction.emoji.id === "658780672756023317" &&
                    user.id !== "659836680353611788";
                  const collector = a.createReactionCollector(filter);
                  collector.on("collect", r => {
                    const embed3 = new Discord.RichEmbed()
                      .setAuthor(message.author.tag, message.author.avatarURL)
                      .setTitle("Advertisement")
                      .addField("Body", ltcmessage)
                      .setTimestamp()
                      .setImage(ltcmessage2)
                      .setColor("BLURPLE");
                    channel2.send(embed3);
                    message.author.send(
                      "Your post was accepted! :white_check_mark:"
                    );
                    a.delete();
                  });

                  const filter1 = (reaction, user) =>
                    reaction.emoji.id === "658780673078722579" &&
                    user.id !== "659836680353611788";
                  const collector1 = a.createReactionCollector(filter1);
                  collector1.on("collect", r => {
                    a.delete();
                    cooldowns.delete(`${message.author.id}_AD`);
                    message.author.send(`Your post was denied! :x:`);
                  });
                });
              }
            });
        });
    });
  }
};
