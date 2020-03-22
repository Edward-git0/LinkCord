const Discord = require('discord.js');
const fs = require('fs');
const handler = require('d.js-command-handler');
const config = require('./config.js');
const Enmap = require('enmap');
const ms = require('ms')


//initalize the client
const client = new Discord.Client();
client.login(config.token);

function newEnmap(name) {
	return new Enmap({
		name, 
		fetchAll: true,
		cloneLevel: 'deep', 
		autoFetch: true, 
		polling: true
	});
}

//ready event

client.on('ready', () => {
	//Status and Activities
	client.user.setActivity(`for @${client.user.username} prefix`, { type: 'WATCHING'});
	//client.user.setStatus('idle')
	client.log = client.channels.get('659149534894489639')
	//End Status and activities

	//Intervals for checking on cooldowns/timeouts. 
	
	//CHECK IF ADS ARE OLD, --> IF THEY ARE OLD, REMOVE THEM FROM THE DATABASE AND REMOVE THE COOLDOWN ON THE USER
	client.setInterval(() => {
		client.ads.forEach(each => {
			if(Date.now() > each.dateSubmitted + ms('6h')) {
				client.ads.set(`${each.adID}-${each.applyingUserID}`, false, 'cooldown')
			}
		});
	}, ms('5m'));

	//CHECK IF MUTES ARE EXPIRED --> If they are expired, unmute them now~
		client.setInterval(() => {
				client.moderationData.forEach(m => {
					if(m.punishmenttype !== 'mute')
						return;
					if(m.expiry === 'perm') return;
					if(m.punishmentRemoved === true) return;
					if(Date.now() > m.expiry) {
						let guild = client.guilds.get('658680354378481675')
						let role = guild.roles.find(r => r.name === 'Muted')
						let user = guild.members.get(m.userid)
						if(!user)
							return;
						guild.members.get(m.userid).removeRole(role.id, ['Their mute time is now over.'])

						let embed = new Discord.RichEmbed()
						.setTitle(`I've unmuted a ${client.users.get(m.userid).tag}`)
						.setDescription(`I have successfully removed the \`Muted\` role from the user ${user.user.tag}`)
						.setFooter(`LinkCord automoderation`)
						.setColor('GREEN')
						.setTimestamp()
						.setThumbnail(user.user.avatarURL)

						user.send(`**You have been unmuted in LinkCord by ${client.user.username} for __Automatic Unmute__** 🥳`)
						let log = guild.channels.find(c => c.name == 'logs')
						if(!log)
							return;
						log.send(embed)

						client.moderationData.set(`${m.caseid}-${m.guildid}-${m.userid}`, true, 'punishmentRemoved')
					}

				});		
		}, ms('5s'));
	
	
	//CHECK IF BANS ARE EXPIRED --> If they are expired, emit the timedUnban event to trigger the automatic unban of the user.
	client.setInterval(() => {
		client.moderationData.forEach(async m => {
			if(m.expiry === 'perm') return;
			if(m.punishmenttype !== 'ban')
					return;
			if(m.punishmentRemoved === true) return;
			if(Date.now() > m.expiry) {
				let guild = client.guilds.get('658680354378481675')
				let user = await client.fetchUser(m.userid)
				guild.unban(m.userid)

				let embed = new Discord.RichEmbed()
				.setTitle(`I've unbanned a ${user.tag}`)
				.setDescription(`I have successfully removed the \`ban\` from the user ${user.tag}`)
				.setFooter(`LinkCord AutoModeration`)
				.setColor('GREEN')
				.setTimestamp()
				.setThumbnail(guild.iconURL)
				let log = guild.channels.find(c => c.name == 'logs')
				if(!log)
					return;
				log.send(embed)

				client.moderationData.set(`${m.caseid}-${m.guildid}-${m.userid}`, true, 'punishmentRemoved')
				}

		});		
}, ms('10s'));

	
	console.log(`I have logged in as ${client.user.tag}.`);
	console.log('I am now going to initalize myself for use.');
	console.log('Now trying to set the status of the bot.');
	
	console.log('I have set the status.')
	console.log('I am now going to initialize the databases');
	client.econData = newEnmap('economyData');
	client.matchableRoles = newEnmap('optInRoles')
	console.log(`The economyData database has been started.`);
	client.cooldownData = newEnmap('cooldownData');
	console.log('The cooldownData database has been started');
	console.log(`I am now ready for use! I am completely started.`);
	console.log('Preparing the advertisements database.')
	client.guildData = newEnmap('guildData')
	client.shopData = newEnmap('shopData')
	client.ads = newEnmap('advertisements')
	client.moderationData = newEnmap('moderationData')
	console.log(`I am now intializing the systemData databse.`);
	client.systemData = newEnmap('systemData');
	client.tempData = newEnmap('tempData')
	client.giveaways = newEnmap('giveawayData')
	console.log(`System Data is ready.`);
});

// This loop reads the clientEventsevents folder and attaches each event file properly 
fs.readdir("./clientEvents/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    // ignore everything that is not precious javascript
    if (!file.endsWith(".js")) return;
    // Load the file
    const event = require(`./clientEvents/${file}`);
    // Get just the event name
    let eventName = file.split(".")[0];
    // this means each event will be called with the client argument,
	// followed by its "normal" arguments, like message, member, etc etc.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./clientEvents/${file}`)];
  });
});

handler(__dirname + '/commands', client, { customPrefix: config.prefix } );
