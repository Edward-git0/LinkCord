const Discord = require('discord.js');
const fs = require('fs');
const handler = require('d.js-command-handler');
const config = require('./config.js');
const Enmap = require('enmap');


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
	console.log(`I have logged in as ${client.user.tag}.`);
	console.log('I am now going to initalize myself for use.');
	console.log('Now trying to set the status of the bot.');
	client.user.setActivity(`For @${client.user.tag}`, { type: 'WATCHING'} );
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
	client.staffapps = newEnmap('staffapplications')
	client.moderationData = newEnmap('moderationData')
	console.log(`I am now intializing the systemData databse.`);
	client.systemData = newEnmap('systemData');
	console.log(`System Data is ready.`);
});

client.on('message', (message) => {
	if(message.channel.type === 'text') {
		client.econData.ensure(`${message.author.id}-${message.guild.id}`, {
			userID: message.author.id, 
			linkCoins: 500, 
			purchases: [],
		})
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
    const event = require(`./events/${file}`);
    // Get just the event name
    let eventName = file.split(".")[0];
    // this means each event will be called with the client argument,
    // followed by its "normal" arguments, like message, member, etc etc.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

handler(__dirname + '/commands', client, { customPrefix: config.prefix } );
