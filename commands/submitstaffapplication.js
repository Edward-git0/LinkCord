module.exports = {
    id: 'submitstaffapplication',
    aliases: ['applyforstaff', 'apply'],
    channels: 'guild',
    exec: async (call) => {
        try {
        
        //Variable declarations

        let legalInquiryAnswer;
        let question1Answer;
        let question2Answer;
        let question3Answer;
        let question4Answer
        let question5Answer;
        let question6Answer;

        
		call.message.channel.send(`Welcome to the staff application! Please open your DM's so the prompt can continue.`)
		let usersDMs = await call.message.author.createDM();
		await call.prompt(`Are you ready to begin the staff application?`, { time: 12000, channel: usersDMs, filter: ['yes', 'no']}).then(msg => {
			if(msg.content === 'yes') {
                msg.reply('Great!');
                call.prompt(`Before we begin, let's get serious for a second. \nI, **${call.message.author.tag}** agree that filling out this application, in no way, will grant me a position at LinkCord or at any of its affiliate(s). \nI, **${call.message.author.tag}** agree that getting a position at LinkCord or at any of its affliliate(s) is decided by Adminstration, and cannot be changed.`, { time: 12000, channel: usersDMs, filter: ['yes', 'no']}).then(msg2 => {
                    if(msg.content === 'yes') {
                        call.prompt(`**Question 1:** On a scale of 1-10, how active are you in our community?`, { time: 15000, channel: usersDMs, attempts: 5,  filter: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}).then(msg3 => {
                                question1Answer = msg3.content
                                call.prompt(`**Question 2:** What is your timezone?`, { time: 15000, channel: usersDMs}).then(msg4 => {
                                    question2Answer = msg4.content
                                    call.prompt(`**Question 3:** How old are you? \n*Please note: The minimium age requirement of Discord is 13 years of age, as such we will not be taking applicants under 13 years of age as per Discord's ToS*`, { time: 25000, channel: usersDMs}).then(msg5 => {
                                        question3Answer = msg5;
                                    })
                                })
                        })
                    }
                    if(msg.content === 'no') {
                        call.message.author.send(`Canceling prompt: You didn't agree to the terms and conditions`);
                        return;
                    }
                });
            }
            if(msg.content === 'no') {
                msg.reply(`Oh ok. Canceling prompt.`)
                return;
            }
		})

        } catch(error) {
            call.message.channel.send(`Oops! That was an error! The issue has been reported to the adminstration team`);
            console.log(error);
        }
    }
}; 
