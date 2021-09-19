// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'searchThings',
  description: 'DMs list of things with names containing a string',
  async execute (message, char, debugLog, debugFlag, pointsName) {
    // filter for regex special chars
    if (char.includes('-')) {
      char = '\-'
    } else if (char.includes('.')) {
      char = '\\.'
    } else if (char.includes('+')) {
      char = '\\+'
    } else if (char.includes('?')) {
      char = '\\?'
    } else if (char.includes('$')) {
      char = '\\$'
    } else if (char.includes('{')) {
      char = '\\{'
    } else if (char.includes('}')) {
      char = '\\}'
    } else if (char.includes('(')) {
      char = '\\('
    } else if (char.includes(')')) {
      char = '\\)'
    } else if (char.includes('^')) {
      char = '\\^'
    } else if (char.includes('|')) {
      char = '\\|'
    } else if (char.includes('*')) {
      char = ''
    }

    // Search the database for things with names containing with the character
    const [foundThings, debugDB] = await db.find(message.guild.id, char)

    // debug
    let debug = `  DEBUG: 2. searchThings.js, foundThing: ${foundThings.length}`
    console.log(debug)

    // if no things are found, send reply with error
    if (foundThings.length === 0) {
      reply.noThingsFound(message, char)
      // if things found, send DM to the message's author with things' karma
    } else {
      const textLength = reply.thingsFound(message, char, foundThings, pointsName)
      const debugReply = `  DEBUG: 3. searchThings.js, reply text.length: ${textLength}`
      console.log(debugReply)
      debug += debugReply
    }

    // if debugFlag, DM debug
    if (debugFlag) {
      message.author.send([
        debugLog,
        debugDB,
        debug
      ])
    }
  }
}
