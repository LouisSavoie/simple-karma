const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'best',
  description: 'Displays the things with the highest points',
  async execute (message, debugLog, debugFlag, pointsName, value) {
    // check if a value was given
    value === undefined ? value = 5 : value = parseInt(value, 10)
    // check if value is a number
    if (!isNaN(value)) {
      if (value !== 0) {
        // get the things from the database
        const [foundThings, debugDB] = await db.findBest(message.guild.id, value)
        debugLog += '\n' + debugDB

        // debug
        const debug = `  DEBUG: 2. best.js, foundThings: ${foundThings.length}`
        console.log(debug)
        debugLog += '\n' + debug

        // if things are found, reply with the things
        if (foundThings) {
          reply.bestFound(message, foundThings, pointsName, value)
          // if not, reply with error
        } else {
          reply.bestNotFound(message)
        }
      } else {
        reply.valueZero(message)
      }
    } else {
      reply.notANumber(message)
    }
    if (debugFlag) reply.sendDebug(message, debugLog)
  }
}
