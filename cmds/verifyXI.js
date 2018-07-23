const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    
    await(message.member.addRole('466571446894723094')
    .catch(console.error));
 
    if (message.member.highestRole.position < message.guild.member(client.user).highestRole.position) {
     message.member.setNickname(`${args[0]} - kelas XI`);
     let embed = new Discord.RichEmbed()
     .setTitle(`${message.author.tag} is Verified`)
     .setDescription(`${args[0]} - kelas XI`)
     .addBlankField()
     .setTimestamp();
     message.channel.send(embed);
      } else {
     message.channel.send("**Infortunately I cannot change your nickname because your role is higher than mine.**")
    }
}
