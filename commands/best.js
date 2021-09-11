// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'best',
  description: 'Displays the best 5 things with the highest karma',
  async execute (message, debugLog, debugFlag, pointsName) {
    // get the things from the database
    const [foundThings, debugDB] = await db.findBest(message.guild.id)

    // debug
    const debug = `DEBUG: 2. best.js, foundThings: ${foundThings}`
    console.log(debug)

    // if things are found, reply with the things
    if (foundThings) {
      reply.bestFound(message, foundThings, pointsName)
      // if not, reply with error
    } else {
      reply.bestNotFound(message)
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
