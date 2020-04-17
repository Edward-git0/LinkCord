module.exports = {
  name: "faq",
  description: "faq",
  category: "moderation",
  execute(message, args, Discord) {
    
    if(message.author.id !== "338509501290250240") {
      return false;
    }
    const embed1 = new Discord.RichEmbed()
      .setTitle("Diamond, Diamond+, and Server Boosting")
      .setColor("BLURPLE")
      .setDescription(
        `We offer a range of extended permissions that we grant to Diamond, Diamond+, and Server Boosters.

For Diamond and Server Boosters;
:rocket: Exclusive 'Server booster' or 'Diamond' role
:rocket: Ability to live stream in our server
:rocket: Priority speaker
:rocket: Advertisement cooldown cut to 3.5 hours
:rocket: 1.65x LinkCoins
(**Diamond is purchasable in the LinkCoin shop**)

For Diamond+;
💎 All the previously mentioned perks
💎 Exclusive 'Diamond+' role
💎 Advertisement cooldown cut to 2.5 hours
💎 15% Discount on all shop items
💎 2.3x LinkCoins
💎 Special place with your name on our website
💎 Knowing you helped out a loving and growing community ❤
💎 We're always accepting more ideas on how to improve Diamond+
(**Information on how to obtain Diamond+ will be released and added to this soon:tm:**)
`
      )
      .setFooter("Page 1 / 7")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/660229347067559964/660877028731387955/Untitled_design_10.png"
      );

    const embed2 = new Discord.RichEmbed()
      .setTitle("How can I post advertisements?")
      .setColor("BLURPLE")
      .setDescription(
        `Use the \`,ad\` command in <#658781098293329995> and follow the instructions given by the bot in your direct messages. When completed, the bot will send your advertisement request to staff for reviewal and approval.`
      )
      .setFooter("Page 2 / 7")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/660229347067559964/660877028731387955/Untitled_design_10.png"
      );

    const embed3 = new Discord.RichEmbed()
      .setTitle("How do roles work?")
      .setColor("BLURPLE")
      .setDescription(`Use the \`,toggle\` command in <#658781098293329995>`)
      .setFooter("Page 3 / 7")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/660229347067559964/660877028731387955/Untitled_design_10.png"
      );

    const embed4 = new Discord.RichEmbed()
      .setTitle("What is GameCord?")
      .setColor("BLURPLE")
      .setDescription(
        `GameCord is a section of the server dedicated to gamers.

GameCord currently features 5 channels.
<#658780957603790858> shows off all the latest game deals so you can get the best possible discount!

<#663425146727563286> for you to find a group for any game you need one in :people_holding_hands:. In order to it, use the LFG command \`,lfg\` in <#658781098293329995>. For example: \`,lfg Novovu\`

<#665970350600880177> where you can post all of your favorite pictures of games :camera_with_flash:. Anyone can post here, only posts containing images are allowed.

<#667561271582785536> so that you can see reviews made by our game-review team of the newest(or oldest) games :scroll:.

<#670045920062078998> for game related discussion(if you don't want to use general chat - where game conversation is welcome too as long as you aren't disrupting anyone)
`
      )
      .setFooter("Page 4 / 7")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/668131178900881428/670412922249412618/gamecord-icon_upscaled_illustration_x4.png"
      );

    const embed5 = new Discord.RichEmbed()
      .setTitle("What is DevCord?")
      .setColor("BLURPLE")
      .setDescription(
        `DevCord is currently unavailable to the public as it's still being worked on.
DevCord will be a section of the server dedicated to game developers. Details are hidden away from the public, as we're still working on deciding some key features to DevCord.

**Coming soon**
`
      )
      .setFooter("Page 5 / 7")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/660229347067559964/660877028731387955/Untitled_design_10.png"
      );

    const embed6 = new Discord.RichEmbed()
      .setTitle("What is LinkShop and what are LinkCoins?")
      .setColor("BLURPLE")
      .setDescription(
        `The LinkShop is our alternative to the leveling system. Instead of chatting to earn levels, you can chat, participate in events and mini-games to earn coins which allows you to buy perks such as access to diamond tier events/giveaways and access to other exclusive content.

LinkCoins are our currency while you'll receive by chatting, participating in events, and joining in mini-games. The coins will be usable in the LinkShop to purchase perks or other exclusive content.

**Coming soon**
`
      )
      .setFooter("Page 6 / 7")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/661052911199059993/670675151242657793/20200125_110308.png"
      );
    
        const embed8 = new Discord.RichEmbed()
      .setTitle("Links")
      .setColor("BLURPLE")
      .setDescription(`
Discord: https://discord.gg/GrXF6rY
Twitter: https://twitter.com/RealLinkCord
Website: N/A
`
      )
      .setFooter("Page 7 / 7")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/660229347067559964/660877028731387955/Untitled_design_10.png"
      );

    const embed7 = new Discord.RichEmbed()
      .setTitle("Access to server")
      .setColor("BLURPLE")
      .setDescription(
        "By joining the server and using our services, you agree to follow all of our rules located in <#658780835763191821>, to be respectful, and use common sense while in our server. You also acknowledge that moderators have full discretion and can make decisions you won't agree with."
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/660229347067559964/660877028731387955/Untitled_design_10.png"
      );

    message.channel.send(embed1).then(() => {
      message.channel
        .send(embed2)
        .then(() => {
          message.channel.send(embed3);
        })
        .then(() => {
          message.channel.send(embed4);
        })
        .then(() => {
          message.channel.send(embed5);
        })
        .then(() => {
          message.channel.send(embed6);
        })
        .then(() => {
          message.channel.send(embed8);
        }).then(() => {
          message.channel.send(embed7);
        })
        .then(() => {
          message.delete();
        });
    });
  }
};
