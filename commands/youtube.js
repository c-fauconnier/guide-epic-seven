module.exports = {
    name: 'youtube',
    description: 'all infos related to youtube videos',
    execute(message, args){
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setColor('#d44737')
        .setTitle('Youtubeurs E7')
        //.setDescription("Voici une liste de liens/informations qui vous aideront")
        .addFields(
          {name: 'Watchoum', value: 'https://www.youtube.com/c/Watchoum'},
          {name: 'Samool (anglophone)', value: 'https://www.youtube.com/c/Samool'},
          {name: 'Epic Seven official channel', value: 'https://www.youtube.com/c/EpicSeven/videos'},
        )
        message.channel.send({embeds: [embed]});
    }
}