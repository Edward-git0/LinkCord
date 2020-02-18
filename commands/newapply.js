const Discord = require('discord.js');
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

           if (await call.prompt(`Before we begin, please read and accept the following agreement. \nI, **${call.message.author.tag}**, agree that filling out this application in no way, will grant me a position at LinkCord or any of its affiliate(s) unless I am accepted as a member of the staff by a verified member of Administration. \nI, **${call.message.author.tag}** also agree that the decision of the status of your application is **final** and cannot be changed unless proof of unfair judgement is provided. \n\nDo you agree to these terms?`, { time: 45000, channel: usersDMs, filter: ['yes', 'no']}).then((m) => m.content.toLowerCase() === 'no')) {
            return call.message.author.send(`:x: Your application was denied by ${call.client.user.tag} for reason __Didn't accept the legal agreement__`);
          }
        //End Legal Agreement prompt;;

        // Question 1 
         await call.prompt(question1String, { time: 30000, channel: usersDMs}).then(question1Msg => {
          question1Answer = question1Msg.content;
        });
        //Question 1 end;

        //question 2;;
         await call.prompt(question2String, { time: 30000, channel: usersDMs}).then(question2Msg => {
          question2Answer = question2Msg.content;
        });
        //question 2 end;;

        //question 3 begin;
        await call.prompt(question3String, { time: 30000, channel: usersDMs}).then(question3Msg => {
            question3Answer = question3Msg.content;
        });
        //question 3 end

        //question 4 begin;

        await call.prompt(question4String, { time: 45000, channel: usersDMs, filter: ['community agent', 'moderator'] }).then(positionInput => {
          if(positionInput.content.toLowerCase() === 'community agent') {

            await call.prompt(question5CommunityString, { time: 50000, channel: usersDMs}).then(question5CMsg => {
              question5Answer = question5CMsg.content;
             });
              call.prompt(question6CommunityString, { time: 50000, channel: usersDMs }).then(question6CMsg => {
               question5Answer = question6CMsg.content;
             })
          }
          if(positionInput.content.toLowerCase() === 'moderator') {
            positionChoice = positionInput.content;
            call.messge.author.send('moderators are gay')
          }

        })
        




        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
