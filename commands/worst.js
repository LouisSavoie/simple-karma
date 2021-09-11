// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'worst',
  description: 'Displays the worst 5 things with the lowest karma',
  async execute (message, debugLog, debugFlag, pointsName) {
    // get the things from the database
    const [foundThings, debugDB] = await db.findWorst(message.guild.id)

    // debug
    const debug = `DEBUG: 2. worst.js, foundThings: ${foundThings}`
    console.log(debug)

    // if things are found, reply with the things
    if (foundThings) {
      reply.worstFound(message, foundThings, pointsName)
      // if not, reply with error
    } else {
      reply.worstNotFound(message)
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
