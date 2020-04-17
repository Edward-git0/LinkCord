module.exports = {
    name: "kill",
    description: "Murder!",
    category: "fun",
    execute(message, args) {
        let pers = message.mentions.users.first() || args.join(" ");

        let persarray = [
          `${pers} was smothered by a pillow. 🛏️`,
          `${pers} drowned. 🤽`,
          `${pers} fell into a vat of acid. :grimacing:`,
          `${pers} crashed into the sun. :sun_with_face:`,
          `${pers} was electrocuted. :zap:`,
          `${pers} was flung into space. :rocket:`,
          `${pers} was eaten by a whale. :whale2:`,
          `${pers}'s head was impaled by a metal straw. :worried:`,
          `${pers} ate bad seafood. :nauseated_face:`,
          `${pers} ran with the scissors. :scissors:`
        ];
    
        if (!pers) return message.channel.send("Who do you want to kill? :knife:");
    
        message.channel.send(
          persarray[Math.floor(Math.random() * persarray.length)]
        );
    }
}