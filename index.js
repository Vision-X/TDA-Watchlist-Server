console.log("____ Bot is running ____");

const env = require('dotenv').load();

const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;


// client.on('message', msg => {
//   if (msg.content === 'hey') {
//     msg.reply('suhhh dude?')
//   }
// })

bot.on('message', function(message) {
  if (message.content === 'hey') {
    message.reply("suhhh dude")
  }
});

bot.login(TOKEN);
