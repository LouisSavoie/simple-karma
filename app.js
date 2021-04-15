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
client.on('message', message => {
    // if message doesn't start with the prefix or the message author is a bot, don't interact.
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    //PintDebug
    console.log("message content:" + message.content)
    // remove prefix from message content and break up remaning command into parts seperated by a space
    const args = message.content.slice(prefix.length).split(' ');
    //PintDebug
    console.log("message args: " + args)
    const command = args[0]
    const userMentioned = args[1]
    //PintDebug
    console.log("command arg: " + command)
    console.log("userMentioned arg: " + userMentioned)

    userID = client.users.cache.filter(user => user.username === userMentioned).first().id
    console.log(userID)

    if(command === 'hey'){
        message.channel.send("Hi, " + message.author.toString());
    }
});

client.login(config.token)