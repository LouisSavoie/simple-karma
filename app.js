const Discord = require('discord.js'),
      client = new Discord.Client(),
      fs = require('fs'),
      config = require('./config.json')

// CONFIRM LOGIN
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    //SET STATUS
    client.user.setActivity(`for 'sk ' commands`, {type: "WATCHING"});
});

// COMMAND PREFIX
const prefix = 'sk ';

//COMMAND HANDLER
client.on('message', msg => {
    // if message doesn't start with the prefix or the message author is a bot, don't interact.
    if(!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }
    //PintDebug
    console.log("msg content:" + msg.content)
    // remove prefix from message content and break up remaning command into parts seperated by a space
    const args = msg.content.slice(prefix.length).split(' ');
    //PintDebug
    console.log("msg args: " + args)
    const command = args[0]
    const userMentioned = args[1]
    //PintDebug
    console.log("command arg: " + command)
    console.log("userMentioned arg: " + userMentioned)

    if(command === 'hey'){
        msg.channel.send("Hi, " + msg.author.toString());
    }
});

client.login(config.token)