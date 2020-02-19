const { RichEmbed } = require('discord.js');
const randomize = require('randomatic');
module.exports = {
    id: 'newapply',
    aliases: ['betaapply'],
    channels: 'any',
    exec: async (call) => {
        try {
            let database = call.client.staffapps
            let applicationApprovalChannel = call.client.channels.get('677649993968123947');
            // Question answer declarations.
            let question1Answer;
            let question2Answer;
            let question3Answer;
            let positionChoice;
            let question5Answer;
            let question6Answer;
            let question7Answer;
            let question8Answer;
            let question9Answer;
            let question10Answer;

            //Questions
            const question1String = `**Question 1:** How old are you?`
            const question2String = `**Question 2:** What timezone do you reside in?`
            const question3String = `**Question 3:** What do you think you bring to the staff team?`
            const question4String = `**Question 4:** Which position are you applying for? \n*Valid Reponses Are: community agent, moderator*`
            const question5CommunityString = `**Question 5C:** How friendly are you on a daily basis?`
            const question6CommunityString = `**Question 6C:** How do you handle stressful situations?`
            const question7CommunityString = `**Question 7C:** How many activities would you be able to arrange for our community?`
            const question8CommunityString = `**Question 8C:** Are you generally a toxic person?`
            const question9CommunityString = `**Question 9C:** Why do you think your a good choice to represent our server?`
            const question10CommunityString = `**Question 10C:** How active do you think you are on a scale of 1-10?`
            const question5ModString = `**Question 5M:** How would you handle rule enforcement in the server?`
            const question6ModString = `**Question 6M:** If your best friend commited a violation of the server rules, would you show bias towards the actions you take on them?`
            const question7ModString = `**Question 7M:** How do you handle stressful situations?`
            const question8ModString = `**Question 8M:** How would you use command sense to pick right from wrong?`
            //place seperator here
            const question9ModSituational = `**Question 9MS:** Edward just posted porn in chat, and his friend Anne is encouraging other people to do the same. How would you react in this situation?`
            const question10ModSituational = `**Question 10MS:** Edward and thetechguy61705 are fighting in chat and its filling up the entire chat. What would be the actions you would take to handle this situation?`
            const question11ModSituational = `**Question 11MS:** DudeCord is claiming that Cudiiz sent a malicious link in DMs. What should you do in this situation?`
            const question12ModSituational = `**Question 12MS:** Two staff members are fighting. How should you react? What actions should you take?`


            const usersDMs = await call.message.author.createDM();

            call.message.channel.send(`Welcome to the LinkCord staff application! The application will now continue in your DMs. Please make sure they are open for me to DM.`)

            //Inital Prompt;;

            //Legal agreement prompt;;

            if (await call.prompt(`Before we begin, please read and accept the following agreement. \nI, **${call.message.author.tag}**, agree that filling out this application in no way, will grant me a position at LinkCord or any of its affiliate(s) unless I am accepted as a member of the staff by a verified member of Administration. \nI, **${call.message.author.tag}** also agree that the decision of the status of your application is **final** and cannot be changed unless proof of unfair judgement is provided. \n\nDo you agree to these terms?`, {
                    time: 45000,
                    channel: usersDMs,
                    filter: ['yes', 'no']
                }).then((m) => m.content.toLowerCase() === 'no')) {
                return call.message.author.send(`:x: Your application was denied by ${call.client.user.tag} for reason __Didn't accept the legal agreement__`);
            }
            //End Legal Agreement prompt;;

            // Question 1 
            const question1collect = await call.prompt(question1String, {
                time: 30000,
                channel: usersDMs
            })
            
            question1Answer = question1collect.content;
            //Question 1 end;

            //question 2;;
            const question2collect = await call.prompt(question2String, {
                time: 30000,
                channel: usersDMs
            })
            question2Answer = question2collect.content;
            //question 2 end;;

            //question 3 begin;
           const question3collect = await call.prompt(question3String, {
                time: 30000,
                channel: usersDMs
            });
            question3Answer = question3collect.content;
            //question 3 end

            //question 4 begin;
            const question4collect = await call.prompt(question4String, {
                time: 45000,
                channel: usersDMs,
                filter: ['community agent', 'moderator']
            })
            positionChoice = question4collect.content;

            if(positionChoice.toLowerCase() === 'community agent') {
              const question5c = await call.prompt(question5CommunityString, { 
                  time: 60000, 
                  channel: usersDMs
                });

                question5Answer = question5c.content;
              const question6c = await call.prompt(question6CommunityString, {
                  time: 60000, 
                  channel: usersDMs
              });
              question6Answer = question6c.content;
              const question7c = await call.prompt(question7CommunityString, {
                  time: 60000, 
                  channel: usersDMs
              })
              question7Answer = question7c.content;
              const question8c = await call.prompt(question8CommunityString, {
                  time: 60000, 
                  channel: usersDMs
              })
              question8Answer = question8c.content;
              const question9c = await call.prompt(question9CommunityString, {
                  time: 60000, 
                  channel: usersDMs
              })
              question9Answer = question9c.content;
              const question10c = await call.prompt(question10CommunityString, {
                  time: 60000, 
                  channel: usersDMs
              })
              question10Answer = question10c.content;
              call.message.author.send(`📡 Submitting your application `).then(msg => {
                const appID = randomize(`A0`, 6);
                const embed = new RichEmbed()
                .setTitle(`${appID}: ${call.message.author.tag} (*${call.message.author.id}*) has submitted an application for ${positionChoice}`)
                .addField(`${question1String}`, `${question1Answer}`)
                .addField(question2String, question2Answer)
                .addField(question3String, question3Answer)
                .addField(question5CommunityString, question5Answer)
                .addField(question6CommunityString, question6Answer)
                .addField(question7CommunityString, question7Answer)
                .addField(question8CommunityString, question8Answer)
                .addField(question9CommunityString, question9Answer)
                .addField(question10CommunityString, question10Answer)
                .setFooter(`LinkCord applications: This user passed Discord's safety check.`);
                applicationApprovalChannel.send(embed)
                msg.edit(`Your application *(${appID})* has successfully been submitted! :) \nA member of Adminstration will be in touch about the status of your application.`)
              });
            }




        } catch (error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
};