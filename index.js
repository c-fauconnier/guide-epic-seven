const Discord = require('discord.js');
const client = new Discord.Client({ intents: [
  Discord.Intents.FLAGS.GUILDS,
  Discord.Intents.FLAGS.GUILD_MESSAGES
] });
const fs = require("fs");
const prefix = "-";

function findWord(word, str) {
  return str.split(' ').some(function(w){return w === word})
}

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Je suis prêt ! Connecté en tant que ${client.user.tag}!`);
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity("-aide");
})

client.on("reconnecting", function(){
  console.log(`client tries to reconnect to the WebSocket`);
});

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

client.on("messageCreate", message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  // !help
  if(command === 'aide'){
    client.commands.get('embed').execute(message, args);
  }

  //!wyvern
  else if(command === 'wyvern'){
    client.commands.get('wyvern').execute(message, args);
  }

  else if(command === 'youtube'){
    client.commands.get('youtube').execute(message, args);
  }
  else if(command === 'samool'){
    message.channel.send('https://www.youtube.com/c/Samool');
  }
  else if(command === 'leaks'){
    message.channel.send('https://www.e7leaks.com/');
  }
})

client.login(process.env.TOKEN);