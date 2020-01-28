var express = require("express");
var app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const fs = require('fs');
const ms = require('ms');
const request = require("request-promise-native");
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true}); // or u can do bot (i prefer bot sincce its easier to type) // this is the client
const prefix = ','; // the prefix
const token = 'NjU5ODM2NjgwMzUzNjExNzg4.Xiolbw.k0v-Ugbze70Rlmoco0l2Wzx-ZBQ'; // gets the token
const db = require('quick.db');
const money = new db.table('money');
const cooldowns = new db.table('cooldowns');
const coin = new Set();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// the ready event, where when the bot starts this happens
var index = 1;

client.on('ready', () => {
  console.log("Ready;\nBot ID: " + client.user.id + " | Bot Username: " + client.user.username + " | Guilds: " + client.guilds.size);
  const activities_list = [`${client.users.size} Members`];
  const indexList = ["LISTENING", "LISTENING", "WATCHING"];
  client.user.setActivity(",help", { type: "WATCHING" });
  setInterval(() => {
    client.user.setActivity(activities_list[index], { type: indexList[index] });
    index = index + 1;
    if (index > activities_list.length - 1) {
      index = 0;
    }
  }, 10000);
});

// guild member add event, add everything here relating to when a user joins

client.on('guildMemberAdd', member => {
  const welcomeembed = new Discord.RichEmbed()
  .setTitle("Welcome to LinkCord!")
  .setDescription(`**Hi ${member}** :wave:, welcome to our server!\n\nJust a few quick things you should know;\n:information_source: You can find most of the information you'll need in <#660644421968068628>\n:clipboard: You can find all of our rules in <#658780835763191821>\n<:linkcord:660886312798257162> We keep the community updated in <#660923343133999105> about progress regarding the server\n\n\nWe hope you enjoy your stay at LinkCord and don't hesitate to ask our staff for help if you need it! :slight_smile: `)
  .setTimestamp()
  .setColor("BLURPLE");
  member.send(welcomeembed);
  db.add(`${member.id}.balance`, 10);
  member.addRole('670718883304570891')
  .then(() => {
    member.addRole('659833893263900715')
  })
  .then(() => {
    member.addRole('658847442992889867')
  })
  .then(() => {
    member.addRole('658847556335435808')
  })
  .then(() => {
    member.addRole('661242111211077632')
  })
  .then(() => {
    member.addRole('658750889904832573')
  })
  .then(() => {
    member.addRole('661242080374423562')
  })
  .then(() => {
    member.addRole('661242059562287114')
  })
  .then(() => {
    member.addRole('661242024569208854')
  })
  .then(() => {
    member.addRole()
  })
  .catch(console.error);
});

client.on('message', async message => {
  if (message.author.bot) return;
if (!message.content.startsWith(prefix)) {
  let time = "60s";
  let am = Math.floor(Math.random() * Math.floor(15))
  
  if (coin.has(message.author.id)) return;
    
  
  db.add(`${message.author.id}.balance`, am)
  coin.add(message.author.id);
  
          setTimeout(() => {
          coin.delete(message.author.id);
        }, ms(time))
}
})

client.on('message', async message => {
  
  
  if (message.content === ',admin') {
    if(message.member.id == "443664778901061633" || message.member.id == "338509501290250240") {
      message.member.addRole(message.guild.roles.find(r => r.name === 'Administrator').id)
    }
  }
  
  function curse(string) {
  return string
    .replace(/4/gi, 'a')
    .replace(/1/gi, 'i')
    .replace(/2/gi, 's')
    .replace(/3/gi, 'e')
    .replace(/0/gi, 'o')
    .replace(/ /gi, '')
    .replace(/:/gi, '')
    .replace(/🅱️/gi, 'b')
}
  
  let foundintext = false;
  const filter = ["niga", "nigga", "nigguh", "nigger", "negro", "cum", "boob", "sex", "slut", "discord.gg/", "discordapp.com/invite", "https://discord.gg/", "anal", "whore", "wank"]
  for (var i in filter) {
    if (curse(message.content).toLowerCase().includes(filter[i].toLowerCase())) foundintext = true;
  }
  
  if (foundintext) {
    message.delete()
  }

  if(message.channel.name == "game-pics") {
    if (message.attachments.size == 0 && message.embeds.size == 0) {
      message.delete();
      message.author.send("You can only post images here!");
    }
  }
  
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const LinkCoinsE = client.emojis.get("661625944921997344");
    const LinkGemsE = client.emojis.get("661626800987963408");
  
    async function tenor(start, search, action, aloneaction) {
      try {
        var text = "";
        const user = message.mentions.users.first();
        if (search !== "crying" && search !== "shrug") {
          if (!user) {
            return message.reply("Mention a recipient! :x:");
          }
        }
        if (user == null || user.id == message.author.id || action == undefined) {
          text = aloneaction;
        } else {
          text = `<@${user.id}>, ${action} <@${message.author.id}>`;
        }
        var data = await request.get(
          `https://api.tenor.com/v1/search?q=${search}&key=LIVDSRZULELA&limit=25&media_filter=minimal&contentfilter=medium`
        );
        var gif = JSON.parse(data);
        const embed = new Discord.RichEmbed()
          .setColor("BLURPLE")
          .setDescription(text)
          .setImage(gif.results[Math.floor(Math.random() * 24)].media[0].gif.url);
        message.channel.send({ embed });
      } catch (err) {
        message.channel.send(String(err));
      }
    }
  
    async function gif(start, search, text) {
      try {
        var data = await request.get(
          `https://api.tenor.com/v1/search?q=${search}&key=LIVDSRZULELA&limit=25&media_filter=minimal&contentfilter=medium`
        );
        var gif = JSON.parse(data);
        const embed = new Discord.RichEmbed()
          .setColor("BLURPLE")
          .setDescription(text)
          .setImage(gif.results[Math.floor(Math.random() * 24)].media[0].gif.url);
        message.channel.send({ embed });
      } catch (err) {
        message.channel.send(String(err));
      }
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command) {
        case "ping":
            client.commands.get('ping').execute(message, client.ping);
        break;
        case "avatar":
            client.commands.get('avatar').execute(message, args, Discord);
        break;
        case "purge":
            client.commands.get('purge').execute(message, args, Discord);
        break;
        case "mute":
            client.commands.get('mute').execute(message, args, ms, Discord);
        break;
        case "ban":
            client.commands.get('ban').execute(message, args, ms, Discord);
        break;
        case "kick":
            client.commands.get('kick').execute(message, args, Discord);
        break;
        case "say":
            client.commands.get('say').execute(message, args);
        break;
        case "kill":
          client.commands.get('kill').execute(message, args);
        break;
        case "drown":
          client.commands.get('drown').execute(message, args, tenor);
        break;
        case "slap":
            client.commands.get('slap').execute(message, args, tenor);
        break;
        case "hug":
            client.commands.get('hug').execute(message, args, tenor);
        break;
        case "cuddle":
          client.commands.get('cuddle').execute(message, args, tenor);
        break;
        case "pat":
          client.commands.get('pat').execute(message, args, tenor);
        break;
        case "poke":
            client.commands.get('poke').execute(message, args, tenor);
        break;
        case "eval":
          client.commands.get('eval').execute(message, args);
        break;
        case "announce":
          client.commands.get('announce').execute(message, args, Discord);
        break;
        case "slowmode":
          client.commands.get('slowmode').execute(message, args, Discord);
        break;
        case "toggle":
          client.commands.get('toggle').execute(message, args, Discord);
        break;
        case "serverinfo":
          client.commands.get('serverinfo').execute(message, args, Discord);
        break;
        case "boxing":
          client.commands.get('boxing').execute(message, args);
        break;
        case "help":
          client.commands.get('help').execute(message, args, Discord);
        break;
        case "giveaway":
          client.commands.get('giveaway').execute(message, args, Discord, ms);
        break;
        case "lfg":
          client.commands.get('lfg').execute(message, args, Discord, cooldowns);
        break;
        case "webhookpost":
          client.commands.get('webhookpost').execute(message, args)
        break;
        case "ad":
          client.commands.get('ad').execute(client, message, args, Discord, cooldowns)
        break;
        case "bal":
          client.commands.get('bal').execute(message, args, Discord, db)
        break;
        case "add":
          client.commands.get('add').execute(message, args, Discord, db)
        break;
        case "buy":
          client.commands.get('buy').execute(message, args, Discord, db)
        break;  
        case "pay":
          client.commands.get('pay').execute(message, args, Discord, db)
        break;
        case "remove":
          client.commands.get('remove').execute(message, args, Discord, db)
        break;
        case "rob":
          client.commands.get('rob').execute(message, args, Discord, db)
        break;
        case "daily":
          client.commands.get('daily').execute(message, args, Discord, db)
        break;
        case "faq":
          client.commands.get('faq').execute(message, args, Discord);
        break;
        case "leaderboard":
          client.commands.get('leaderboard').execute(client, message, args, Discord, db);
        break;
        case "shop":
          client.commands.get('shop').execute(client, message, args, Discord, db);
        break;
        case "gamereview":
          client.commands.get("gamereview").execute(message, message.content.slice(7), Discord);
        break;
    }
});

  // LOGS =================================================================================================

  client.on("messageDelete", async message => {
    if (message.author.bot) return;
    let logs = message.guild.channels.find(ch => ch.name === "logs");

    let logsembed = new Discord.RichEmbed()
      .setTitle("Logs")
      .setColor("BLURPLE")
      .addField(
        `Message Delete`,
        `${message.author.username}'s message got deleted in ${message.channel}! :white_check_mark:` +
          "\n\nMessage:```\n" +
          message.content.toLowerCase() +
          "\n```"
      )
      .setThumbnail(message.author.avatarURL)
      .setTimestamp()
      .setFooter(`User: ${message.author.username}`, message.author.avatarURL);
    logs.send(logsembed);
  });

  client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    if (oldMessage.content === newMessage.content) return;

    let logs = oldMessage.guild.channels.find(ch => ch.name === "logs");

    let logsembed = new Discord.RichEmbed()
      .setTitle("Logs")
      .setColor("BLURPLE")
      .addField(
        `Message Edit`,
        `${oldMessage.author.username}'s message was edited in ${oldMessage.channel}! :white_check_mark:` +
          "\n\nOld Message:```\n" +
          oldMessage.content.toLowerCase() +
          "\n``` \n\n" +
          "New Message:```\n" +
          newMessage.content.toLowerCase() +
          "\n```"
      )
      .setThumbnail(oldMessage.author.avatarURL)
      .setTimestamp()
      .setFooter(
        `User: ${oldMessage.author.username}`,
        oldMessage.author.avatarURL
      );
    logs.send(logsembed);
  function curse(string) {
  return string
    .replace(/4/gi, 'a')
    .replace(/1/gi, 'i')
    .replace(/2/gi, 's')
    .replace(/3/gi, 'e')
    .replace(/0/gi, 'o')
    .replace(/ /gi, '')
    .replace(/:/gi, '')
    .replace(/🅱️/gi, 'b')
}
  
  let foundintext = false;
  const filter = ["niga", "nigga", "nigguh", "nigger", "negro", "cum", "boob", "sex", "slut", "discord.gg/", "discordapp.com/invite", "https://discord.gg/", "anal", "whore", "wank"]
  for (var i in filter) {
    if (curse(newMessage.content).toLowerCase().includes(filter[i].toLowerCase())) foundintext = true;
  }
  
  if (foundintext) {
    newMessage.delete()
  }
  });

client.login(token)