const wait = require('util').promisify(setTimeout);
const fs       = require("fs");
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const db = require('quick.db');
const Config = require('./config.json');
const log = require('./Functions/PrimeLogger');
const rest = new REST({version: 9}).setToken(Config.TOKEN)


module.exports = async function(bot) {

    const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, MessageAttachment } = require("discord.js");

    bot.on("ready", async () => {

        await wait(2000)

        const Embed1 = new MessageEmbed()
        .setColor('BLURPLE')
        .setTitle("Prime Control Panel")

        const row1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId(`plash`)
            .setLabel(`Public Global Commands`)
            .setStyle('PRIMARY'),

        )



        const Channel = bot.channels.cache.get('Ye Channel Private')
        await Channel.bulkDelete(80)
        await wait(1500)

        await Channel.send({embeds: [Embed1], components: [row1]}).then(() => {
            log('newz', `Control Panel Updated.`)
        })
        const collector = Channel.createMessageComponentCollector({componentType: 'BUTTON'});

        collector.on("collect", async i => {

            if(i.user.id === 'USER ID DEV') {

                if(i.customId === 'plash') {
                    const commandz = [];
                    await i.deferUpdate();
         
                    const commandsFolder = fs.readdirSync('./Commands')
                    for (const folder of commandsFolder) {
                      const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js')) 
                      for (const file of commandFiles) {
                        const command = require(`./Commands/${folder}/${file}`);
                        if(command.readdata === true) {
                          log('reading', `Loading ${file} (s) from ./Commands/${folder}`)
                          commandz.push(command.data)       
                        }   
                      } 
                    }
                    try {
                        log('slash', `Starting To Register Global Commands... ETA 2 Hours`)
                        await i.followUp(`:white_check_mark: در حال ثبت نام گلوبال، زمان پیشبینی پایان دو ساعت میباشد`)
                        await rest.put(
                          Routes.applicationCommands(Config.ID),
                          { body: commandz }
                        )
                      } catch(error) {
                        await i.followUp(`:x: مشکلی در اجرا پیش آمد`)
                        log('error', `Error in Slash : ${error}`)
                      }
                }

            } else {
                //dozd gir molayi XD
                await i.deferUpdate();
                await i.followUp(`<@785366347957141544>\nفردی در حال زدن رو دکمه ها بود\nID : ${i.user.id}\nTag : ${i.user.tag}`)
            }

        })



    
       


    })

}