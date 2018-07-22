const Discord = require("discord.js"); 
const bot = new Discord.Client({disableEveryone: true}); // botnya tidak bisa mention ke everyone
const config = require("./config.json"); // tempat menaruh prefix & token
const fs = require("fs");

bot.on("ready", async () => {
	console.log(`${bot.user.username} Bot Ready!`); // untuk memberitahu bahwa bot sudah siap
	bot.user.setActivity("Sedang Dalam Development", {type: "PLAYING"});
});

bot.on("message", async message => {
	if (message.author.bot) return; // bot tidak akan menjawab apabila di command bot lain
	if (message.channel.type === 'dm') return; // bot tidak akan menjawab di DM

	let prefix = config.prefix;
	let msg = message.content.toLowerCase(); // command disisipkan spasi
	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();

	if (!msg.startsWith(prefix)) return; // agar bot tidak baca pesan tanpa prefix

	try {
		let commandFile = require(`./cmds/${cmd}.js`);
		commandFile.run(bot, message, args);
	} catch (e) {
		conseole.log(e.message)
	} finally {
		console.log(`${author} menggunakan perintah ${cmd}`);
	}

});

bot.on("guildMemberAdd", member => {
	let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
	if (!autorole[member.guild.id]) { // jika tidak ada autorole yang di set, agar tidak serror saat ada yang join
		autorole[member.guild.id] = {
			autorole: config.autorole
		};
	}
	var role = autorole[member.guild.id].role;
	if (!role) return; // jika autorole 0 maka akan dihentikan dan tidak menyebabkan error
	member.addRole(role);
});

bot.login(config.token);