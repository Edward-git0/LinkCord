module.exports = {
    name: "poke",
    description: "Poke!",
    category: "fun",
    execute(message, args, tenor) {
        tenor(6, "poke", "got poked by", " ( ͡° ͜ʖ ͡°)");
    }
}