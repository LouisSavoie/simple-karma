const Discord = require('discord.js'),
      client = new Discord.Client(),
      fs = require('fs');

require('dotenv').config();

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

// MESSAGE HANDLER
client.on('message', message => {
    // if message doesn't start with the prefix and is form a bot, return
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    // remove the prefix from the message, convert mentions to plain strings, split the arguments into an array by spaces
    const args = message.cleanContent.slice(prefix.length).split(' ');

    // split args array into command and thing strings
    const command = args[0]
    const thing = args[1]

    // COMMAND TREE
    if(command == 'help'){
        client.commands.get('help').execute(message);
    } else if (command == 'newkarma'){
        client.commands.get('newKarma').execute(message, thing);
    } else if (command == 'karma'){
        client.commands.get('getKarma').execute(message, thing);
    } else if (command == '+karma'){
        client.commands.get('incrementKarma').execute(message, thing);
    } else if (command == '-karma'){
        client.commands.get('decrementKarma').execute(message, thing);
    }
});

// CONFIRM LOGIN
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    //SET STATUS
    client.user.setActivity(`sk help`, {type: "WATCHING"});
});

// LOGIN
client.login(process.env.SKTOKEN)