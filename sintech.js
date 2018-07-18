const Discord = require("discord.js"); 
const bot = new Discord.Client({disableEveryone: false}); // botnya tidak bisa mention ke everyone
const config = require("./config.json"); // tempat menaruh prefix & token

bot.on("ready", async () => {
	console.log(`${bot.user.username} Bot Ready!`); // untuk memberitahu bahwa bot sudah siap
	bot.user.setActivity("Sedang Dalam Development", {type: "PLAYING"});
});

bot.on("message", async message => {
	if (message.author.bot) return; // bot tidak akan menjawab apabila di command bot lain
	if (message.channel.type === 'dm') return; // bot tidak akan menjawab di DM
	
	let prefix = config.prefix;
	let msg = message.content.toLowerCase(); // case snsitive
	let sender = message.autor; // pengirim
	let args = message.content.slice(prefix.length).trim().split(" ")// bisa milih prefi/command
	let cmd = args.shift().toLowerCase(); // command tidak case sensitive

	try {
		let commandFile = require(`./cmds/${cmd}.js`);
		commandFile.run(bot, message, args);
	} catch (e) {
		conseole.log(e.message)
	} finally {
		console.log(`${author} menggunakan perintah ${cmd}`);
	}

});

bot.login(config.token);