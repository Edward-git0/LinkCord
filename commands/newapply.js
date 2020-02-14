const Discord = require('discord.js');
module.exports = {
    id: 'newapply',
    aliases: ['betaapply'],
    channels: 'guild/dm/any',
    exec: async (call) => {
        try {
        let database = call.client.staffapps
        let applicationApprovalChannel = call.client.channels.get('677649993968123947');
        // Question answer declarations.
        let legalInquiryAnswer;
        let question1Answer;
        let question2Answer;
        let question3Answer;
        let question4Answer;
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
        const question4String = `**Question 4:** Which position are you applying for? \n*Available options: Community manager, moderator`
        const question5CommunityString = `**Question 5C:** How friendly are you on a daily basis?`
        const question6CommunityString = `**Question 6C:**`


        const usersDMs = call.message.author.createDM();

        call.message.channel.send(`Welcome to the LinkCord staff application! The application will now continue in your DMs. Please make sure they are open for me to DM.`)
        
        //Inital Prompt;;

           //Legal agreement prompt;;

          await call.prompt(`Before we begin, please read and accept the following agreement. \nI, **${call.message.author.tag}**, agree that filling out this application in no way, will grant me a position at LinkCord or any of its affiliate(s) unless I am accepted as a member of the staff by a verified member of Administration. \nI, ${call.message.author.tag} also agree that the decision of the status of your application is **final** and cannot be changed unless proof of unfair judgement is provided. \n\nDo you agree to these terms?`, { time: 45000, channel: usersDMs, filter: ['yes', 'no']}).then(legalAgreementMsg => {
             if(legalAgreementMsg.content.toLowerCase() === 'no') return call.message.author.send(`:x: Your application was denied by ${call.client.user.tag} for reason __Didn't accept the legal agreement__`);
           });
        //End Legal Agreement prompt;;

        // Question 1 
        await call.prompt(`**Question 1:** How old are you?`, { time: 30000, channel: usersDMs}).then(question1Msg => {
          question1Answer = question1Msg.content;
        });
        //Question 1 end;

        await call.prompt(``)





        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has 
            been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
