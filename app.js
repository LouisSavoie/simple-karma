// REQUIRES
const Discord   = require('discord.js'),
      client    = new Discord.Client(),
      // For reading command files
      fs        = require('fs'),
      // For database models
      mongoose  = require('mongoose');

require('dotenv').config();

// CONNECT MONGOOSE TO MONGODB
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('Mongoose connected to MongoDB'))
.catch(error => console.log(error.message));
mongoose.set('useFindAndModify', false);

// CREATE COMMANDS COLLECTION
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

// COMMAND SYNTAX
// <prefix> <command> <thingName>(optional)

// COMMAND PREFIX
const prefix = 'sk ';

// MESSAGE HANDLER
client.on('message', message => {
    // if message doesn't start with the prefix and is form a bot, return
    if(!message.content.toLowerCase().startsWith(prefix) || message.author.bot) {
        return;
    }
    // remove the prefix from the message, convert mentions to plain strings, split the arguments into an array by spaces
    const args = message.cleanContent.slice(prefix.length).split(' ');

    // split args array into command and thingName strings
    const command = args[0].toLowerCase();
    const thingName = args[1];
    const getThingName = args[0];

    // COMMAND TREE
    if (command == 'help'){
        client.commands.get('help').execute(message);
    } else if (command == 'new'){
        client.commands.get('newThing').execute(message, thingName);
    } else if (command == '+karma'){
        client.commands.get('incrementKarma').execute(message, thingName);
    } else if (command == '-karma'){
        client.commands.get('decrementKarma').execute(message, thingName);
    } else if (command == 'search'){
        client.commands.get('searchThings').execute(message, thingName);
    } else if (command == 'delete'){
        client.commands.get('trollDelete').execute(message, thingName);
    } else {
        client.commands.get('getThing').execute(message, getThingName);
    }
});

// CONFIRM LOGIN
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // SET STATUS
    // client.user.setActivity(`"sk help"`, {type: "WATCHING"});
    // Status for testing
    client.user.setActivity(`"TESTING"`, {});
});

// LOGIN
client.login(process.env.SKTOKEN)