module.exports = {
    name: 'help',
    description: 'embed for the help command',
    execute(message, args){
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setColor('#d44737')
        .setTitle('Liste des commandes')
        //.setURL("")
        //.setAuthor("Auteur du bot : Frost#6653")
        .setThumbnail('https://epic7x.com/wp-content/uploads/2018/12/Luna-icon.jpg')
        .setDescription('Mettez "-" devant chaque commande')
        .addFields(
          {name: 'aide', value: '_Affiche la liste des commandes_'},
          {name: 'wyvern', value: '_Affiche une page pour mieux comprendre la chasse wyvern_'},
          {name: 'youtube', value: '_Affiche la liste des youtubeurs E7_'},
          {name: 'leaks', value: '_Lien vers le site epic seven leaks_'}
        )
        message.channel.send({embeds: [embed]});
    }
}