// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'searchThings',
  description: 'DMs list of things with names containing a string',
  async execute (message, char) {
    // Search the database for things with names containing with the character
    const foundThings = await db.find(char)

    // debug
    console.log('DEBUG: 2. searchThings.js, foundThings: ' + foundThings)

    // if no things are found, send reply with error
    if (foundThings.length == 0) {
      reply.noThingsFound(message, char)
      // if things found, send DM to the message's author with things' karma
    } else {
      reply.thingsFound(message, char, foundThings)
    }
  }
}
