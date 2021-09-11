const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const mongoose = require('mongoose')
const db = require('./functions/database')

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

// CREATE DEBUG LOG
let debugLog = ''
let debugFlag = false

// COMMAND SYNTAX
// <prefix> <command> <thingName> <value>
// <prefix> <command> <thingName>
// <prefix> <getThingName>

// COMMAND PREFIX
const prefix = 'sk '

// MESSAGE HANDLER
client.on('message', async message => {
  // FILTER OUT MESSAGES
  // if message is a DM, it won't have the correct object methods for some commands and could cause a crash
  // if message doesn't start with the prefix and is form a bot, return
  if (!message.guild || !message.content.toLowerCase().startsWith(prefix) || message.author.bot) {
    return
  }

  // DEBUG
  // Reset debug vars to default values
  debugLog = ''
  debugFlag = false

  const debugMsgHandler = `
  .
  >>>>>>>>>>>>>>>>> MESSAGE HANDLER <<<<<<<<<<<<<<<<<
  DEBUG: Guild id: ${message.guild.id}`

  console.log(debugMsgHandler)
  debugLog += debugMsgHandler

  // CHECK SERVER POINTSNAME
  let [pointsName, debugDB] = await db.findPointsName(message.guild.id)
  if (!pointsName) pointsName = 'Points'
  const debugPoints = `  DEBUG: 2. app.js, pointsName: ${pointsName}`
  console.log(debugPoints)
  debugLog += debugDB
  debugLog += debugPoints

  // COMMAND ARGS PROCESSING
  // remove the prefix from the message, convert mentions to plain strings,
  // split the arguments into an array by spaces, allow things with spaces between parens
  const argsArray = message.cleanContent.slice(prefix.length).split(/(?!\(.*)\s(?![^(]*?\))/g)

  if (argsArray.includes('debug')) {
    argsArray.splice(argsArray.indexOf('debug'), 1)
    debugFlag = true
  }

  // split args array into args
  let command = argsArray[0]
  let thingName = argsArray[1]
  let getThingName = argsArray[0]
  let value = argsArray[2]

  // args transformations
  if (command) {
    command = command.toLowerCase()
  }
  // remove Discord's zero width space char form User thingName
  if (thingName && thingName.startsWith('@') && thingName.charCodeAt(1) === 8203) {
    thingName = thingName.slice(0, 1) + thingName.slice(2)
  }
  // remove Discord's zero width space char form User GetThingName
  if (getThingName && getThingName.startsWith('@') && getThingName.charCodeAt(1) === 8203) {
    getThingName = getThingName.slice(0, 1) + getThingName.slice(2)
  }
  // remove parens from thingName if present for things that include spaces
  if (thingName && thingName.startsWith('(') && thingName.endsWith(')')) {
    thingName = thingName.slice(1, -1)
  }
  // remove space from thingName after @ for user names with spaces
  if (thingName && thingName.startsWith('@') && thingName.charCodeAt(1) === 32) {
    thingName = thingName.slice(0, 1) + thingName.slice(2)
  }
  // remove parens from getThingName if present for things that include spaces
  if (getThingName && getThingName.startsWith('(') && getThingName.endsWith(')')) {
    getThingName = getThingName.slice(1, -1)
  }
  // remove space from getThingName after @ for user names with spaces
  if (getThingName && getThingName.startsWith('@') && getThingName.charCodeAt(1) === 32) {
    getThingName = getThingName.slice(0, 1) + getThingName.slice(2)
  }

  // remove parens from value if present for things that include spaces
  if (value && value.startsWith('(') && value.endsWith(')')) {
    value = value.slice(1, -1)
  }
  // remove space from value after @ for user names with spaces
  if (value && value.startsWith('@') && value.charCodeAt(1) === 32) {
    value = value.slice(0, 1) + value.slice(2)
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

  const debugArgs = `
  ================= Command Args ==================
  DEBUG: command: ${command}
  DEBUG: thingName: ${thingName}
  DEBUG: thingNameCharCodes: ${thingNameCharCodes}
  DEBUG: getThingName: ${getThingName}
  DEBUG: getThingNameCharCodes: ${getThingNameCharCodes}
  DEBUG: value: ${value}
  DEBUG: debugFlag: ${debugFlag}`

  console.log(debugArgs)
  debugLog += debugArgs

  // BANNED CHARACTERS REGEX
  const bannedCharsRegex = /[`\\]/g

  // COMMAND NAMES ARRAY
  // an array containing the syntax of commands that include a thingName,
  // incase the thingName is omitted from the command,
  // the getThingName can be checked against this array to verify if it was meant for the getThing command.
  const commandNamesArray = ['new', '+', '-', 'search', 'delete']

  // COMMAND TREE
  // if thingName or getThingName contains banned chars, send error reply
  if (bannedCharsRegex.test(getThingName) || bannedCharsRegex.test(thingName)) {
    client.commands.get('unknownCommand').execute(message, debugLog, debugFlag)
  } else {
    if (command === 'undo') {
      client.commands.get('undo').execute(client.commands, message, null, null, debugLog, debugFlag, pointsName)
    } else if (thingName) {
      // if the args include a thingName, check these commands
      if (command === 'new') {
        client.commands.get('newThing').execute(message, thingName, debugLog, debugFlag, null, true)
      } else if (command === '+') {
        client.commands.get('incrementKarma').execute(message, thingName, debugLog, debugFlag, true, pointsName)
      } else if (command === '-') {
        client.commands.get('decrementKarma').execute(message, thingName, debugLog, debugFlag, true)
      } else if (command === 'search') {
        client.commands.get('searchThings').execute(message, thingName, debugLog, debugFlag, pointsName)
      } else if (command === 'delete') {
        client.commands.get('trollDelete').execute(message, thingName, debugLog, debugFlag)
        // admin commands
      } else if (command === 'adminset') {
        client.commands.get('adminSet').execute(message, thingName, value, debugLog, debugFlag, false, true)
      } else if (command === 'adminrename') {
        client.commands.get('adminRename').execute(message, thingName, value, debugLog, debugFlag, false, true)
      } else if (command === 'admindelete') {
        client.commands.get('adminDelete').execute(message, thingName, debugLog, debugFlag, false, true)
      } else if (command === 'namepoints') {
        client.commands.get('namePoints').execute(message, thingName, debugLog, debugFlag)
      } else {
        client.commands.get('unknownCommand').execute(message, debugLog, debugFlag)
      }
      // if args does not include a thingName, check these commands
    } else {
      if (command === 'help') {
        client.commands.get('help').execute(message, debugLog, debugFlag)
      } else if (command === 'best') {
        client.commands.get('best').execute(message, debugLog, debugFlag, pointsName)
      } else if (command === 'worst') {
        client.commands.get('worst').execute(message, debugLog, debugFlag, pointsName)
      } else {
        // if getThingName is omitted and was a valid command, send error reply
        if (commandNamesArray.includes(getThingName)) {
          client.commands.get('noThing').execute(message, debugLog, debugFlag)
        } else {
          client.commands.get('getThing').execute(message, getThingName, debugLog, debugFlag, pointsName)
        }
      }
    }
  }
})

// JOIN HANDLER
client.on('guildMemberAdd', member => {
  // Reset debug vars to default values
  debugLog = ''
  debugFlag = false

  // DEBUG
  console.log('>>>>>>>>>>>>>>>>> JOIN HANDLER <<<<<<<<<<<<<<<<<')
  console.log(`DEBUG: @${member.displayName} joined`)

  client.commands.get('addOnJoin').execute(member)
})

// CONFIRM LOGIN
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

  // SET STATUS
  client.user.setActivity('"sk help"', { type: 'WATCHING' })

  // Status for testing
  // client.user.setActivity('"TESTING"', {})
})

// LOGIN
client.login(process.env.SKTOKEN)
