const Discord = require("discord.js"); 
const bot = new Discord.Client({disableEveryone: true}); // botnya tidak bisa mention ke everyone
const config = require("./config.json"); // tempat menaruh prefix & token
const fs = require("fs");

bot.on("ready", async () => {
	console.log(`${bot.user.username} Bot Ready!`); // untuk memberitahu bahwa bot sudah siap
	bot.user.setActivity("Sedang Dalam Development", {type: "PLAYING"});
});

bot.on('guildMemberAdd', member => {
    let guild = member.guild;
    let count = guild.memberCount;
    let user = member.guild.channels.get('466570242487877634')

    user.setName(`Live User Count: ${count}`)

    let greetmsg = member.guild.channels.get('466570242487877634')
	greetmsg.send(`Selamat datang ${member.user} di **SINTECH**. **User Count: ${count}** \nJangan lupa baca <#466735905202503689> sebelum berdiskusi bersama disini.`);
});

bot.on('guildMemberRemove', member => {
    let guild = member.guild;
    let count = guild.memberCount;
    let user = member.guild.channels.get('466570242487877634')

    user.setName(`Live User Count: ${count}`)

    let greetmsg = member.guild.channels.get('466570242487877634')
    greetmsg.send(`${member.user.tag} is Leaving **SINTECH**. **User Count: ${count}**`);
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

bot.login(process.env.BOT_TOKEN);
