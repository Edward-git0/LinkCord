module.exports = {
    name: "toggle",
    description: "Toggle roles",
    category: "general",
    execute(message, args, Discord) {
        if (args[0] == "list") {
            const list = new Discord.RichEmbed()
              .setTitle("Toggle Roles")
              .addField(
                "GameCord Roles",
                ":man_superhero: MMORPG \n:man_police_officer: FPS \n:man_firefighter: Action \n:man_astronaut: Adventure \n:man_mage: Fantasy \n:man_health_worker: Roleplay \n:man_in_steamy_room: Sports \n:man_zombie: Horror"
              )
              .addField(
                "DevCord Roles",
                ":vhs: User Interface \n:tv: Graphics \n:desktop: Programming \n:movie_camera: Rendering \n:loud_sound: Media"
              )
              .addField(
                "Ping Roles",
                ":ticket: Events Ping \n:newspaper: News Ping \n:gift: Giveaway Ping\n🎮 Review Ping"
              )
              .setTimestamp()
              .setColor("BLURPLE")
              .setFooter("LinkCord");
      
            message.channel.send(list);
        } else {
            let role = args.join(" ");
            if (!role)
              return message.channel.send(
                "Enter a togglable role! Do `,toggle list` to see an array of togglable roles. :x: `,toggle {role}`"
              );
                switch(role) {
                    case "mmorpg":
                        if (!message.member.roles.find(r => r.name === "🦸 MMORPG")) {
                            message.member.addRole("659184092776235029").then(() => {
                            message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659184092776235029").then(() => {
                            message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "fps":
                        if (!message.member.roles.find(r => r.name === "👮 FPS")) {
                            message.member.addRole("659184352042811402").then(() => {
                            message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659184352042811402").then(() => {
                            message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "action":
                        if (!message.member.roles.find(r => r.name === "👨‍🚒 Action")) {
                            message.member.addRole("659184119359471666").then(() => {
                            message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659184119359471666").then(() => {
                            message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "adventure":
                        if (!message.member.roles.find(r => r.name === "👨‍🚀 Adventure")) {
                            message.member.addRole("659184183511351328").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659184183511351328").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "fantasy":
                        if (!message.member.roles.find(r => r.name === "🧙 Fantasy")) {
                            message.member.addRole("659184202012688425").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659184202012688425").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "strategy":
                        if (!message.member.roles.find(r => r.name === "🕵️ Strategy")) {
                            message.member.addRole("659184291380723712").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659184291380723712").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "roleplay":
                        if (!message.member.roles.find(r => r.name === "👩‍⚕️ Roleplay")) {
                            message.member.addRole("659184337316610098").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659184337316610098").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "sports":
                        if (!message.member.roles.find(r => r.name === "🧖 Sports")) {
                            message.member.addRole("659184565549662228").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659184565549662228").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "horror":
                        if (!message.member.roles.find(r => r.name === "🧟 Horror")) {
                            message.member.addRole("659184640925499404").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659184640925499404").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "user interface":
                        if (!message.member.roles.find(r => r.name === "📼 User Interface")) {
                            message.member.addRole("659913714199167005").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659913714199167005").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "ui":
                        if (!message.member.roles.find(r => r.name === "📼 User Interface")) {
                            message.member.addRole("659913714199167005").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659913714199167005").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "graphics":
                        if (!message.member.roles.find(r => r.name === "📺 Graphics")) {
                            message.member.addRole("659913866880352257").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659913866880352257").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "programming":
                        if (!message.member.roles.find(r => r.name === "🖥️ Programming")) {
                            message.member.addRole("659913894747308039").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659913894747308039").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "rendering":
                        if (!message.member.roles.find(r => r.name === "🎥 Rendering")) {
                            message.member.addRole("659913921737785406").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("659913921737785406").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "media":
                        if (!message.member.roles.find(r => r.name === "🔊 Media")) {
                            message.member.addRole("660193120264388608").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("660193120264388608").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "events ping":
                        if (!message.member.roles.find(r => r.name === "🎫 Events Ping")) {
                            message.member.addRole("661242024569208854").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("661242024569208854").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "news ping":
                        if (!message.member.roles.find(r => r.name === "📰 News Ping")) {
                            message.member.addRole("661242059562287114").then(() => {
                              message.channel.send("Role set! :white_check_mark:");
                            });
                        } else {
                            message.member.removeRole("661242059562287114").then(() => {
                              message.channel.send("Role removed! :white_check_mark:");
                            });
                        }
                    break;
                    case "giveaway ping":
                        if (!message.member.roles.find(r => r.name === "🎁 Giveaway Ping")) {
                          message.member.addRole("661242080374423562").then(() => {
                            message.channel.send("Role set! :white_check_mark:");
                          });
                        } else {
                          message.member.removeRole("661242080374423562").then(() => {
                            message.channel.send("Role removed! :white_check_mark:");
                          });
                        }
                    break;
                  case "review ping":
                        if (!message.member.roles.find(r => r.name === "🎮 Review Ping")) {
                          message.member.addRole("670718883304570891").then(() => {
                            message.channel.send("Role set! :white_check_mark:");
                          });
                        } else {
                          message.member.removeRole("670718883304570891").then(() => {
                            message.channel.send("Role removed! :white_check_mark:");
                          });
                        }
                  break;  
                }
          }
    }
}