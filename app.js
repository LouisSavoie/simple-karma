// REQUIRES
const Discord = require('discord.js')
const client = new Discord.Client()
// For reading command files
const fs = require('fs')
// For database models
const mongoose = require('mongoose')

require('dotenv').config()

// CONNECT MONGOOSE TO MONGODB
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log('Mongoose connected to MongoDB'))
  .catch(error => console.log(error.message))
mongoose.set('useFindAndModify', false)

// CREATE COMMANDS COLLECTION
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
};

// COMMAND SYNTAX
// <prefix> <command> <thingName>(optional)

// COMMAND PREFIX
const prefix = 'sk '

// MESSAGE HANDLER
client.on('message', message => {
  // FILTER OUT MESSAGES
  // if message is a DM, it won't have the correct object methods for some commands and could cause a crash
  // if message doesn't start with the prefix and is form a bot, return
  if (!message.guild || !message.content.toLowerCase().startsWith(prefix) || message.author.bot) {
    return
  }

  // COMMAND ARGS PROCESSING
  // remove the prefix from the message, convert mentions to plain strings, split the arguments into an array by spaces
  const argsArray = message.cleanContent.slice(prefix.length).split(' ')

  // split args array into args
  let command = argsArray[0]
  let thingName = argsArray[1]
  let getThingName = argsArray[0]
  let value = argsArray[2]

  // args transformations
  if (command) {
    command = command.toLowerCase()
  }

  if (thingName && thingName.startsWith('@') && thingName.charCodeAt(1) === 8203) {
    thingName = thingName.slice(0, 1) + thingName.slice(2)
  }

  if (getThingName && getThingName.startsWith('@') && getThingName.charCodeAt(1) === 8203) {
    getThingName = getThingName.slice(0, 1) + getThingName.slice(2)
  }

  if (value) {
    value = parseInt(value, 10)
  }

  // DEBUG
  // get char codes for thingName and getThingName
  const thingNameCharCodes = []
  const getThingNameCharCodes = []

  if (thingName) {
    for (let i = 0; i < thingName.length; i++) {
      thingNameCharCodes.push(thingName.charCodeAt(i))
    };
  }

  if (getThingName) {
    for (let i = 0; i < getThingName.length; i++) {
      getThingNameCharCodes.push(getThingName.charCodeAt(i))
    };
  }

  // console messages
  console.log('================= Command Args ==================')
  console.log('DEBUG: command: ' + command)
  console.log('DEBUG: thingName: ' + thingName)
  console.log('DEBUG: thingNameCharCodes: ' + thingNameCharCodes)
  console.log('DEBUG: getThingName: ' + getThingName)
  console.log('DEBUG: getThingNameCharCodes: ' + getThingNameCharCodes)
  console.log('DEBUG: value: ' + value)

  // BANNED CHARACTERS REGEX
  const bannedCharsRegex = /[`\\]/g

  // COMMAND NAMES ARRAY
  // an array containing the syntax of commands that include a thingName,
  // incase the thingName is omitted from the command,
  // the getThingName can be checked against this array to verify if it was ment for the getThing command.
  const commandNamesArray = ['new', '+', '-', 'search', 'delete']

  // COMMAND TREE
  // if thingName or getThingName contains banned chars, send error reply
  if (bannedCharsRegex.test(getThingName) || bannedCharsRegex.test(thingName)) {
    client.commands.get('unknownCommand').execute(message)
    // else, proceed
  } else {
    // if the args include a thingName, check these commands
    if (thingName) {
      if (command === 'new') {
        client.commands.get('newThing').execute(message, thingName)
      } else if (command === '+') {
        client.commands.get('incrementKarma').execute(message, thingName)
      } else if (command === '-') {
        client.commands.get('decrementKarma').execute(message, thingName)
      } else if (command === 'search') {
        client.commands.get('searchThings').execute(message, thingName)
      } else if (command === 'delete') {
        client.commands.get('trollDelete').execute(message, thingName)
        // admin commands
      } else if (command === 'adminset') {
        client.commands.get('adminSet').execute(message, thingName, value)
      } else if (command === 'admindelete') {
        client.commands.get('adminDelete').execute(message, thingName)
      }
      // if args does not include a thingName, check these commands
    } else {
      if (command === 'help') {
        client.commands.get('help').execute(message)
      } else if (command === 'best') {
        client.commands.get('best').execute(message)
      } else if (command === 'worst') {
        client.commands.get('worst').execute(message)
      } else {
        // if getThingName is omitted and was a valid command, send error reply
        if (commandNamesArray.includes(getThingName)) {
          client.commands.get('noThing').execute(message)
          // else, it was a getThing request
        } else {
          client.commands.get('getThing').execute(message, getThingName)
        }
      }
    }
  }
})

// JOIN HANDLER
client.on('guildMemberAdd', member => {
  // DEBUG
  console.log(`--- DEBUG: @${member.displayName} joined ---`)

  client.commands.get('addOnJoin').execute(member)
})

// CONFIRM LOGIN
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

  // SET STATUS
  client.user.setActivity('"sk help"', { type: 'WATCHING' })
  // Status for testing
  // client.user.setActivity(`"TESTING"`, {});
})

// LOGIN
client.login(process.env.SKTOKEN)
