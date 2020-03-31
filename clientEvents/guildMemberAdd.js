const Discord = require('discord.js')

module.exports = (client, member) => {
    let channel = client.channels.get('659179304135032843')
    const welcomeembed = new Discord.RichEmbed()
        .setTitle("Welcome to LinkCord!")
        .setDescription(
            `**Hi ${member}** :wave:, welcome to our server!\n\nJust a few quick things you should know;\n:information_source: You can find most of the information you'll need in <#660644421968068628>\n:clipboard: You can find all of our rules in <#658780835763191821>\n<:linkcord:660886312798257162> We keep the community updated in <#660923343133999105> about progress regarding the server\n\n\nWe hope you enjoy your stay at LinkCord and don't hesitate to ask our staff for help if you need it! :slight_smile: `
        )
        .setTimestamp()
        .setColor("BLURPLE");
    channel.send(welcomeembed)
    member.addRole('670718883304570891')
    member.addRole('659833893263900715')
    member.addRole('658847442992889867')
    member.addRole('661242111211077632')
    member.addRole('658750889904832573')
    member.addRole('661242080374423562')
    member.addRole('661242059562287114')
    member.addRole('661242024569208854')


    let muteFind = client.moderationData.find(r => {
        return r.punishmentRemoved === false && r.userid === member.id && r.punishmenttype === 'mute'
    })
    if(muteFind) {
        let embed = new Discord.RichEmbed()
        .setTitle(`A mute has been re-issued.`)
        .setDescription(`⚠️ A user tried to evade a mute and was remuted! ⚠️\n**User:**${member}\n**Reason:** ${muteFind.reason}`)
        .setFooter(`LinkCord Moderation`, client.user.avatarURL)
        .setTimestamp()
        .setColor('YELLOW')
        member.guild.channels.find(r => r.name === 'logs').send(embed)
        member.addRole(member.guild.roles.find(r => r.name === 'Muted'), 'The user tried to evade a mute.')
    }
}