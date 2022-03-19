require('dotenv').config();
const Discord = require('discord.js');
const search = require('youtube-search');
const list = require('./youtube.json')
const { google } = require('googleapis');
const client = new Discord.Client({ intents: [
  Discord.Intents.FLAGS.GUILDS,
  Discord.Intents.FLAGS.GUILD_MESSAGES
] });
const fs = require("fs");
const prefix = "-";


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Je suis prêt ! Connecté en tant que ${client.user.tag}!`);
  client.user.setActivity("-aide");


  const opts = {
    maxResults: 1000,
    key: process.env.YOUTUBE_KEY,
    type: 'video',
    channelId: 'UCZStuoLKslHsEzGgWL4rxKg',
    order: 'date'
  };

  let channel_new_vid = client.channels.cache.get("911686200375525399");
  let channel_bot = client.channels.cache.get("953289783977869395");
  setInterval(function (){
      let result = search('', opts).catch(err => console.log(err));
      result.then(function (r) {
          r.results.forEach(element => {
              if (list['watchoum'].indexOf(element.id) == -1) {
                  console.log(element.id);
                  channel_new_vid.send("https://www.youtube.com/watch?v=" + element.id)
                  list['watchoum'].push(element.id);
                  fs.writeFile("./youtube.json", JSON.stringify(list, null, 4), (err) => {
                      if (err) channel_bot.send("Trop de requêtes.");
                  });
              }
          });
      })
  },900000)
})

client.on("reconnecting", function(){
  console.log(`client tries to reconnect to the WebSocket`);
});

/*
function findWord(word, str) {
  return str.split(' ').some(function(w){return w === word})
}

client.on('messageCreate', message => {
  if(message.author.id == `729093880477384785`){
    if(findWord('eco',message.content)){
      message.pin()
    }
    else if(findWord('économies',message.content)){
      message.pin()
    }
    else if(findWord('économie',message.content)){
      message.pin()
    }
  }
})
*/

client.on("messageCreate", message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'aide':
      client.commands.get('help').execute(message, args);
      break;

    case 'wyvern':
      client.commands.get('wyvern').execute(message, args);
      break;

    case 'youtube':
      client.commands.get('youtube').execute(message, args);
      break;

    case 'leaks':
      message.channel.send('https://www.e7leaks.com/');
      break;
  }
})

client.login(process.env.TOKEN);