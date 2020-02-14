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




        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
