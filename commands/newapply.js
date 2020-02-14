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


        const usersDMs = call.message.author.createDM();

        call.message.channel.send(`Welcome to the LinkCord staff application! The application will now continue in your DMs. Please make sure they are open for me to DM.`)
        
        //Inital Prompt;;

       await call.prompt(`Hello! Are you ready to begin your application to become LinkCord staff?`, { time: 30000, channel: usersDMs, filter: ['yes', 'no']}).then(initialQuestion => {
         if(initialQuestion.content.toLowerCase() === 'no') {
           call.message.author.send(`OK. Cancelling prompt.`)
           return;
         } else {
           call.prompt(`Before we begin, please read and accept the following agreement. \nI, **${call.message.author.tag}**, agree that filling out this application in no way, will grant me a position at LinkCord or any of its affiliate(s) unless I am accepted as a member of the staff by a verified member of Administration. \nI, ${call.message.author.tag} also agree that if I am declined for a position at LinkCord or any of its affiliate(s), that it is the finald decision of the administration member if you are accepted or not.`)
         }
       });




        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
