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
    const argsArray = message.cleanContent.slice(prefix.length).split(' ');

    // split args array into args
    let command = argsArray[0];
    let thingName = argsArray[1];
    let getThingName = argsArray[0];

    // args transformations
    if (command) {
        command = command.toLowerCase();
    }

    if (thingName && thingName.startsWith("@") && thingName.charCodeAt(1) == 8203) {
        thingName = thingName.slice(0, 1) + thingName.slice(2);
    }
    
    if (getThingName.startsWith("@") && getThingName.charCodeAt(1) == 8203) {
        getThingName = getThingName.slice(0, 1) + getThingName.slice(2);
    }

    // debug
    let getThingNameCharCodes = [];

    for (let i = 0; i < getThingName.length; i++) {
        getThingNameCharCodes.push(getThingName.charCodeAt(i));
    };

    console.log("================= Command Args ==================");
    console.log("DEBUG: command: " + command);
    console.log("DEBUG: thingName: " + thingName);
    console.log("DEBUG: getThingName: " + getThingName);
    console.log("DEBUG: getThingNameCharCodes: " + getThingNameCharCodes);

    // BANNED CHARACTERS REGEX
    const bannedCharsRegex = /[`*_\\]/g;

    // COMMAND NAMES ARRAY
    // an array containing the syntax of commands that include a thingName,
    // incase the thingName is omitted from the command,
    // the getThingName can be checked against this array to verify if it was ment for the getThing command.
    const commandNamesArray = ['new', '+', '-', 'search', 'delete'];

    // COMMAND TREE
    if (bannedCharsRegex.test(getThingName) || bannedCharsRegex.test(thingName)){
        client.commands.get('unknownCommand').execute(message);
    }
    
    // if the args include a thingName, check these commands
    if (thingName){
        if (command == 'new'){
            client.commands.get('newThing').execute(message, thingName);
        } else if (command == '+'){
            client.commands.get('incrementKarma').execute(message, thingName);
        } else if (command == '-'){
            client.commands.get('decrementKarma').execute(message, thingName);
        } else if (command == 'search'){
            client.commands.get('searchThings').execute(message, thingName);
        } else if (command == 'delete'){
            client.commands.get('trollDelete').execute(message, thingName);
        }
    // if args does not include a thingName, check these commands
    } else {
        if (command == 'help'){
            client.commands.get('help').execute(message);
        } else {
            //if getThingName is omitted and was a valid command, send error reply
            if (commandNamesArray.includes(getThingName)) {
                client.commands.get('noThing').execute(message);
            // else, it was a getThing request
            } else {
                client.commands.get('getThing').execute(message, getThingName);
            }
        }
    }
    
});

// CONFIRM LOGIN
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // SET STATUS
    client.user.setActivity(`"sk help"`, {type: "WATCHING"});
    // Status for testing
    // client.user.setActivity(`"TESTING"`, {});
});

// LOGIN
client.login(process.env.SKTOKEN)