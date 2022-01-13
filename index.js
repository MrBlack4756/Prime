const { Client, Intents, Collection, MessageEmbed, Permissions } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] }); // Har intenti niaz bood add bedid!
const fs  = require("fs");
/* 
man az quick.db estefade kardm ke benazar khodamam khob nist :|
age khastid be delkhah khodeton change bedid vali bara start khobe...
*/
const db = require('quick.db');
/* 
logger sade!
*/
const log = require('./Functions/PrimeLogger');
const Config = require('./config.json');
const express = require('express');
const chalk = require("chalk");
const app = express();
/* 
autoposter bara ine ke info shard/tedad guild ro be site POST kone pas age 
niaz nadarid pakesh konid
...
info bishtar : 
https://docs.top.gg/
*/
const { AutoPoster } = require('topgg-autoposter');
const ap = AutoPoster(Config.TOPGGTOKEN, bot);

/* 
function routes bara rah endakhtan site shomast hamzaman ba bot bara masaref API o ...
etelaat bishtaro to routes.js bbnid
*/
require('./routes')(bot, app, express, 80)
const commandz = [];
bot.commands = new Collection();


/* 
Nokati dar mored code zir

1. (Commands) ro mitoonid taghir bedid bayad to kol in gesmat esm folder ro bznid
2. sabk in handler ine ke toye folder ham bayad folder bzanid :
  Commands
    |_ Fun Commands
              |_ magik.js
              |_ fun.js
    |_ Admin Commands
                |_ ban.js
                |_ test.js
*/
const commandsFolder = fs.readdirSync('./Commands')
for (const folder of commandsFolder) {
  const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js')) 
  for (const file of commandFiles) {
    const command = require(`./Commands/${folder}/${file}`);
    if(command.readdata === true) {
      log('reading', `Loading ${file}(s) from ./Commands/${folder}`)
      commandz.push(command.data)
      bot.commands.set(command.data.name, command)
    }   
  } 
}
///////////////////////////////////////////////////////


//EVENT HANDLER IS GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY

bot.on('ready', async () => {
    log('ready', `Prime Handler V13 Connected To Discord API / Login as ${bot.user.tag}`);
    log('newz', `Prefix : /`);  
    //status is haram:D
})

/* 
code zir : 
full etelaat to file khodeshe
*/
require('./ControlPanel')(bot)

// har 30 min auto post mishe
ap.on('posted', async () => {
  log('topgg', 'Stats Updated!');
})
// error ham pish biad inja mizane
ap.on('error', async (e) => {
  log('topgg', `Error in Updating!\n${e}`);
})

bot.on("guildCreate", guild => {
  if(!guild.available) return //baazi guild haye bozorg gaha unavailable mishn bayad bot error nade o off nashe
  log('join', `Guild Name : ${guild.name} | Guild ID : ${guild.id} | Owner ID : ${guild.ownerId}`)
  bot.channels.cache.get(`CHANNEL JOIN SERVER SHOMA`)
.send({
  embeds: [
    new MessageEmbed()
    .setColor('GREEN')
    .setThumbnail(guild.iconURL({dynamic: true}))
    .setTitle(`> New Server : **${guild.name}**`)
    .setFooter({text: 'Prime Handler', iconURL: bot.user.displayAvatarURL({size: 512, dynamic: false})})
  ]
})
})

bot.on("guildDelete", async guild => {
  if(!guild.available) return
  log('leave', `Guild Name : ${guild.name} | Guild ID : ${guild.id} | Owner ID : ${guild.ownerId}`)
})


bot.on('interactionCreate', async interaction => { 
  if(!interaction.guild.available) return;
  // ye permission checker sade
  if(!interaction.channel.permissionsFor(interaction.guild.me).has([Permissions.FLAGS.USE_EXTERNAL_EMOJIS, 
  , Permissions.FLAGS.ATTACH_FILES, Permissions.FLAGS.EMBED_LINKS], true)) return interaction.reply(
    ":x: | No permission"
  )
    if(interaction.isCommand()) {

      if(!bot.commands.has(interaction.commandName)) return;
      const command = bot.commands.get(interaction.commandName);
      if (!command) return;

      try{
        await command.execute(interaction, bot)
        //inja harchi bara ranking bekhayd bezarid!   
      } catch(error) {
        console.error(`[${chalk.red(`INTERACTION`)}] - ` + error);
        const Bug = new MessageEmbed()
        .setColor('RED')
        .setDescription("**خطا در اجرای کامند**")
        return await interaction.reply({embeds: [Bug], ephemeral: true})
        //mitoonid inja az ye webhook (bara inke khodetoon ham khabardar beshid az error) estefade konid.
      }
    }

})

process.on('unhandledRejection', (error, p) => {
  log(`unhandle`, `Error : ${error}\nMessage : ${error.message}`)
  console.dir(error.stack)
});


bot.on("error", e => {log('error', e)});

  
//debug ro vagti vagean midoonid darid chikar mikonid roshan konid (az comment dar biarid)

//  bot.on("debug", d => {log('debug', d)});
   

bot.on("warn", w => {log('warn', w)});
bot.login(Config.TOKEN);
