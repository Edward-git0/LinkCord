module.exports = {
    name: "boxing",
    description: "Who will win the boxing match?",
    category: "fun",
    execute(message, args) {
        let user = message.mentions.users.first();

        if (!user) return message.channel.send("Specify a user! :x:");
    
        let boxer = [message.author.username, user.username];
    
        message.channel.send(
          ":boxing_glove: The Winner of the boxing match is... **" +
            boxer[Math.floor(Math.random() * boxer.length)] +
            "**! :boxing_glove:"
        );
    }
}
