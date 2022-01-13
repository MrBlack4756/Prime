
const  { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
//context menu ham mishe


module.exports = {
    readdata: true, //readdata bara ine vagti mikhayd register slash global/serveri konid age false bashe command khonde nemishe o yejoori mishe goft pak mishe
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription("تست کردن یک شخص")
    .addUserOption(o => o.setName('user').setDescription('تست کیو میخاید؟')).toJSON(),
    async execute(interaction) {

        const User = interaction.options.getUser('user') || interaction.user;
        const ID = User.id;

    
    const Embed = new MessageEmbed()
    .setDescription(`**تست ${User.username}**`)
    .setTitle(`شما تست شدید!`)
    .setColor('GREEN')
    .setFooter({text: "Prime"})
 
    return await interaction.reply({embeds: [Embed]})
    //return akhar har amaliat niaze ta amaliat haye dige be f*** naran


    }
}

