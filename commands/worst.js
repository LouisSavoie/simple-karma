const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'worst',
  description: 'Displays the worst 5 things with the lowest karma',
  async execute (message, debugLog, debugFlag, pointsName) {
    // get the things from the database
    const [foundThings, debugDB] = await db.findWorst(message.guild.id)
    debugLog += '\n' + debugDB

    // debug
    const debug = `DEBUG: 2. worst.js, foundThings: ${foundThings.length}`
    console.log(debug)
    debugLog += '\n' + debug

    // if things are found, reply with the things
    if (foundThings) {
      reply.worstFound(message, foundThings, pointsName)
      // if not, reply with error
    } else {
      reply.worstNotFound(message)
    }
    if (debugFlag) reply.sendDebug(message, debugLog)
  }
}
