module.exports = {
    id: 'ping',
    aliases: ['pong'], // defaults to []
    channels: 'any', // defaults to 'any'. options are: 'dm', 'guild', 'any'.
    // 'call' is an instance of the Call class, a class containing various properties and utility functions.
    exec: (call) => {
        call.message.channel.send('Pong! ' + Math.round(call.client.ping) + 'ms D-API delay.');
    }
};