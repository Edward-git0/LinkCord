module.exports = {
    name: "say",
    description: "Say something",
    category: "fun",
    execute(message, args) {
        if (!message.member.hasPermission(["MANAGE_MESSAGES"]))
        return message.channel.send("You can't use this command! :x:");
        let msg = args.join(" ");
        if (!msg) return message.channel.send("Please enter a message! :x:");
        message.channel.send(msg);
    }
}