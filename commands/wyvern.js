module.exports = {
    name: 'wyvern',
    description: 'all infos related to wyvern',
    execute(message, args){
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setColor('#d44737')
        .setTitle('Guide wyvern')
        .setDescription("Voici une liste de liens/informations qui vous aideront")
        .addFields(
          {name: 'Google doc', value: 'https://docs.google.com/document/d/1nDlmSpGDtt8FNQSgDrAaPwlJHy59ogOYdVm6r4gzk6Q/edit?usp=sharing'},
        )
        message.channel.send({embeds: [embed]});
    }
}