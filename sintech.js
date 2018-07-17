const Discord = require("discord.js"); 
const bot = new Discord.Client();

bot.on("ready", async () => {
	console.log('Ready!'); // untuk memberitahu bahwa bot sudah siap
});

bot.on("message", async (message) => {
	if (message.content.startsWith('ping')) {
		message.channel.send("EA"); // untuk mengetes apakah bot merespon atau tidak
	}
});

bot.login(process.env.Bot_TOKEN)
