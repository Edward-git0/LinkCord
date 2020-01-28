module.exports = {
    name: "hug",
    description: "Who doesn't want a hug?",
    category: "fun",
    execute(message, args, tenor) {
        tenor(6, "hug", "got hugged by", "Come on are you that lonely T-T?");
    }
}