const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    
    await(message.member.addRole('466571404251496458')
    .catch(console.error));
 
    if (message.member.highestRole.position < message.guild.member(client.user).highestRole.position) {
     message.member.setNickname(`${args[0]} - kelas X`);
     let embed = new Discord.RichEmbed()
     .setTitle(`${message.author.tag} is Verified`)
     .setDescription(`${args[0]} - kelas X`)
     .addBlankField()
     .setTimestamp();
     message.channel.send(embed);
      } else {
     message.channel.send("**Infortunately I cannot change your nickname because your role is higher than mine.**")
    }
}
