const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let sicon = message.guild.iconURL; // avatar server
    let serverembed = new Discord.RichEmbed()
    .setAuthor("Server Information")
    .setColor("#0000FF")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name) // nama server discord
    .addField("Created ON", message.guild.createdAt) // tanggal server dibuat
    .addField("You Joined", message.member.joinedAt) // tanggal member join
    .addField("Owner", message.guild.owner); // owner server

    message.channel.send(serverembed);
}

exports.help = {
    name: "serverinfo"
}
