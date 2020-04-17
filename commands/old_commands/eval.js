module.exports = {
    name: "eval",
    description: "Developers only",
    category: "fun",
    execute(message, args) {
        if (
            message.author.id !== "598513581033521152" &&
            message.author.id !== "443664778901061633" &&
            message.author.id !== "338509501290250240"
          ) {
            return message.reply("This command is developer-only :x:!");
          }
          var code = args.join(" ");
          code = code.replace("```js", "");
          code = code.replace("```", "");
          try {
            eval(code);
          } catch (err) {
            message.reply("An unexpected error was caught! :x:");
            const newErr = err;
            message.channel.send(`\`${newErr}\``);
            return;
          }
          message.reply("Code successfully ran! :white_check_mark:").then(msg => {
            msg.delete(2000);
          });
    }
}