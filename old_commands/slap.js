module.exports = {
    name: "slap",
    description: "Slapped across the face. Ouch.",
    category: "fun",
    execute(message, args, tenor) {
        tenor(6, "slap", "got slapped by", "How do you even slap yourself?");
    }
}