const Discord = require('discord.js');
const handler = require('d.js-command-handler');
const config = require('./config.js');
const Enmap = require('enmap');


//initalize the client
const bot = new Discord.Client();
bot.login(config.token);

function newEnmap(name) {
	return new Enmap({
		name, 
		fetchAll: true,
		cloneLevel: 'deep', 
		autoFetch: true, 
		polling: true
	});
};

//ready event

bot.on('ready', () => {
	console.log(`I have logged in as ${bot.user.tag}.`);
	console.log('I am now going to initalize myself for use.');
	console.log('Now trying to set the status of the bot.');
	bot.user.setActivity(`For @${bot.user.tag}`, { type: 'WATCHING'} );
	console.log('I have set the status.')
	console.log('I am now going to initialize the databases');
	bot.economyData = newEnmap('economyData');
	console.log(`The economyData database has been started.`);
	bot.cooldownData = newEnmap('cooldownData');
	console.log('The cooldownData database has been started and is listening at localhost:8080');
	console.log(`I am now ready for use! I am completely started.`);
	console.log(`I am now intializing the systemData databse.`);
	bot.systemData = newEnmap('systemData');
	console.log(`System Data is ready.`);
});

bot.on('message', (message) => {
	bot.economyData.ensure(`${message.author.id}-${message.guild.id}`, {
		userID: message.author.id, 
		linkCoins: 500, 
		purchases: [], 
		activityMeter: 0
	})
	bot.cooldownData.ensure(`${message.author.id}-${message.guild.id}`, {
		userID: message.author.id, 
		activeCoolGuildID: message.guild.id,
		commandsWithActiveCool: [], 
		commandHashWithActiveCool: [], 
		coolPardon: false,
	});
	bot.systemData.ensure(message.author.id, {
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


handler(__dirname + '/commands', bot, { customPrefix: config.prefix } );
