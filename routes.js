const path = require('path');
const log = require('./Functions/PrimeLogger');
const Config = require('./config.json');
const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const db = require('quick.db');
const Topgg = require('@top-gg/sdk');
const weebhook = new Topgg.Webhook(Config.TOPGGWEBHOOK);

module.exports = async function(discord, app, express, port) {

//  const express = require('express')
//  const app = express()

app.use(express.json());
app.use(express.raw())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
//folder "public" mitoonid file haye site berizid va ba danesh express.js site o bot ro hamzaman start bezanid.

   
//age top.gg vote dadan be shoma az sitesh tanzim mikonid be site shoma ye data POST konan
//inja neveshtim ke vagti post ro daryaft kardim msln be channel embed befrestim...
//mitoonid msln jayeze ham bedid! (db add...)
//NOTE: bayad site shoma ro vps set shode bashe!
app.post("/dblwebhook", weebhook.listener(async vote => {
  if(vote.type === 'test') return console.log("test test! vote")
const d = await axios({
  method: "GET",
  url: encodeURI(`https://orpex.herokuapp.com/userz/${vote.user}`) //api user ma bara dor zadan guild member intent :/
})
const { avatar, tag } = await d.data;
return discord.channels.cache.get(`ID CHANNEL VOTE HA`)
.send({
  embeds: [
    new MessageEmbed()
    .setColor('GREEN')
    .setThumbnail(avatar)
    .setTitle(`> Hey **${tag}**`)
    .setDescription(`مرسی برای ووت دادنت!\nThanks For Vote!`)
    .setFooter({text: 'Prime', iconURL: discord.user.displayAvatarURL({size: 512, dynamic: false})})
  ]
})
}))



    app.get('/', function(req, res) {
        return res.sendFile(path.join(__dirname, '/public/test.html'));
      });

  

    
    app.listen(80, () => {
     log('api', `Running On https://localhost:${port}`)
    })
    

}
