const Discord = require("discord.js");

exports.run = async (bot, message, args) =>{
    let bicon = bot.user.displayAvatarURL; // untuk menampikan avatar bot
    let botembed = new Discord.RichEmbed()
    .setAuthor("Bot Information")
    .setColor("0xff2f2f") // bisa pake kode HEX
    .setThumbnail(bicon) // thumbnail dari avatar bot
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    message.channel.send(botembed); // untuk mengirim embed
}

exports.help ={
    name: "botinfo"
}
