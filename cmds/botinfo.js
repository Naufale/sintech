const Discord = require("discord.js");

exports.run = async (client, message, args) =>{
    let bicon = client.user.displayAvatarURL; // untuk menampikan avatar bot
    let botembed = new Discord.RichEmbed()
    .setAuthor("Bot Information")
    .setColor("#0000FF") // bisa pake kode HEX
    .setThumbnail(bicon) // thumbnail dari avatar bot
    .addField("Bot Name", client.user.username)
    .addField("Created On", client.user.createdAt);

    message.channel.send(botembed); // untuk mengirim embed
}

exports.help ={
    name: "botinfo"
}
