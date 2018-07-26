const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
const tools = require('./functions.js');
const request = require('superagent');
const prefix = '!!!!';
const config = require('./config.json')
const fs = require("fs");
const moment = require('moment');
const snekfetch = require("snekfetch");
const db = require('quick.db');

client.on("guildCreate", guild => {
  console.log(`Invited bot to: ${guild.name}, created by ${guild.owner.user.username}!`)
});

client.on("guildDelete", guild => {
  console.log(`Kicked from: ${guild.name}. BYE.`)
});

client.on('guildMemberAdd', member => {
    let guild = member.guild;
    let count = guild.memberCount;
    let user = member.guild.channels.get('472047469015072779')

    user.setName(`Live User Count: ${count}`)

    let greetmsg = member.guild.channels.get('466570242487877634')
	greetmsg.send(`Selamat datang ${member.user} di **SINTECH**. **User Count: ${count}** \nJangan lupa baca <#466735905202503689> sebelum berdiskusi bersama disini.`);
});

client.on('guildMemberRemove', member => {
    let guild = member.guild;
    let count = guild.memberCount;
    let user = member.guild.channels.get('472047469015072779')

    user.setName(`Live User Count: ${count}`)

    let greetmsg = member.guild.channels.get('466570242487877634')
    greetmsg.send(`${member.user.tag} is Leaving **SINTECH**. **User Count: ${count}**`);
});


client.on('message', message => { 
 
  let msg = message.content.toUpperCase(); 
  let sender = message.author; 
  let args = message.content.slice(prefix.length).trim().split(' '); 
  let cmd = args.shift().toLowerCase(); 

    const ClientMention = new RegExp(`^<@!?${client.user.id}> help`);
    if (message.content.match(ClientMention)) {
        return message.reply(`My prefix is **s!** \nJust type **s!help** for all command list.`);
    }
 
  if (!msg.startsWith(prefix)) return; 
  if (message.author.bot) return; 
  if (message.channel.type === 'dm') return
 
  
  try { 
    let commandFile = require(`./cmd/${cmd}.js`); 
    commandFile.run(client, message, args, tools); 
  } catch (e) { 
    console.log(e.message);
  } finally { 
    console.log(`${message.author.tag} menjalankan perintah: ${cmd}`); 
  }
 
})
 
client.on("ready", () => {
    function randomStatus() {
        let status = ["SINTECH BOT PROJECT", "Developed by MAMAM", "s!help", "Unstable Build !!!"]
          let rstatus = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[rstatus], {type: 'PLAYING'});
    }; setInterval(randomStatus, 10000)
    console.log("BOT SINTECH RUNNING");
});

client.on("guildMemberAdd", member => {
	let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
	if (!autorole[member.guild.id]) { 
		autorole[member.guild.id] = {
			autorole: config.autorole
		};
	}
	var role = autorole[member.guild.id].role;
	if (!role) return; 
	member.addRole(role);
});

client.login(process.env.SECRET); 
