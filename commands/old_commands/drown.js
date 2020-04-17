module.exports = {
    name: "drown",
    description: "Death by water",
    category: "fun",
    execute(message, args, tenor) {
        tenor(
            6,
            "drowning",
            "got drowned by",
            "Are you trying to drown yourself O-o?"
          );
    }
}