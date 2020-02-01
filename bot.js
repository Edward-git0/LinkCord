const Discord = require('discord.js');
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
	console.log('The cooldownData database has been started and is listening at localhost:8080');
	console.log(`I am now ready for use! I am completely started.`);
	console.log(`I am now intializing the systemData databse.`);
	client.systemData = newEnmap('systemData');
	console.log(`System Data is ready.`);
});

client.on('message', (message) => {
	client.econData.ensure(`${message.author.id}-${message.guild.id}`, {
		userID: message.author.id, 
		linkCoins: 500, 
		purchases: [], 
		activityMeter: 0
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
});


handler(__dirname + '/commands', client, { customPrefix: config.prefix } );
