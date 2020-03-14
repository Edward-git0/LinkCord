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
	client.user.setActivity(`@${client.user.tag} prefix`, { type: 'WATCHING'} );
	client.user.setStatus('idle')
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

	//CHECK IF MUTES ARE EXPIRED --> If they are expired, emit the userUnmute event to trigger the unmute of the user.
		//to Do 
	
	
	//CHECK IF BANS ARE EXPIRED --> If they are expired, emit the timedUnban event to trigger the automatic unban of the user.
		//To do

	
	console.log(`I have logged in as ${client.user.tag}.`);
	console.log('I am now going to initalize myself for use.');
	console.log('Now trying to set the status of the bot.');
	
	console.log('I have set the status.')
	console.log('I am now going to initialize the databases');
	client.econData = newEnmap('economyData');
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
	console.log(`System Data is ready.`);
});


client.on('message', (message) => {
	if(message.author.bot)
		return;

	
	if(message.channel.type === 'text') {
		client.econData.ensure(`${message.author.id}-${message.guild.id}`, {
			userID: message.author.id, 
			guildID: message.guild.id,
			linkCoins: 175,
			lastDaily: "0",
			purchases: [],
		});
		client.cooldownData.ensure(`${message.author.id}-${message.guild.id}`, {
			userID: message.author.id, 
			activeCoolGuildID: message.guild.id,
			commandsWithActiveCool: [], 
			commandHashWithActiveCool: [], 
			coolPardon: false,
		});
		client.systemData.ensure(message.author.id, {
			userID: message.author.id, 
			userBlocked: false, 
			grantEvalAccess: false, 
			grantEconAdmin: false, 
			grantSuperPerms: false, 
			grantEdwardIsADuck: false, 
			grantDevCodeAccess: false, 
			grantCodeExportAccess: false
		});
		client.guildData.ensure(message.guild.id, {
			lastcase: 0,
			cases: [],
			playing: false,
			queue: []
		});
	}
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
