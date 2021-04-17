const Discord = require('discord.js'),
      client = new Discord.Client(),
      fs = require('fs'),
      config = require('./config.json');

// CREATE COMMANDS COLLECTION
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

// COMMAND SYNTAX
// <prefix> <command> <thing>(optional)

// COMMAND PREFIX
const prefix = 'sk ';

//COMMAND HANDLER
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    
    const args = message.cleanContent.slice(prefix.length).split(' ');

    //PintDebug
    // console.log("message args: " + args)

    const command = args[0]
    const thing = args[1]

    //PintDebug
    // console.log("command, arg[0]: " + command)
    // console.log("thing, arg[1]: " + thing)

    if(command == 'help'){
        //ChannelPrintDebug
        // message.channel.send("Yes, I can help with, " + thing);
        client.commands.get('help').execute(message);
    } else if (command == 'newkarma'){
        client.commands.get('newKarma').execute(message, thing);
    } else if (command == 'karma'){
        client.commands.get('getKarma').execute(message, thing);
    }
    // TODO:
    // else if (command == '+'){
    //     client.commands.get('increment').execute(message, thing);
    // } else if (command == '-'){
    //     client.commands.get('decrement').execute(message, thing);
    // }
});

// CONFIRM LOGIN
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    //SET STATUS
    client.user.setActivity(`for 'sk ' commands`, {type: "WATCHING"});
});

// LOGIN
client.login(config.token)