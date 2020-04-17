module.exports = {
    name: "pat",
    description: "Pat on the head for a job well done.",
    category: "fun",
    execute(message, args, tenor) {
        tenor(6, "pat", "got a pat by", "Patting yourself must look weird..");
    }
}