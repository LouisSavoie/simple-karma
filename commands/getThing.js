// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'getThing',
  description: 'Displays a thing',
  async execute (message, thingName, debugLog, debugFlag, pointsName) {
    // check if the database has the thing
    const [foundThing, debugDB] = await db.findOne(message.guild.id, thingName)
    debugLog += '\n' + debugDB

    // debug
    const debug = `  DEBUG: 2. getThing.js, thing: ${foundThing}`
    console.log(debug)
    debugLog += '\n' + debug

    // if it does, reply with the thing
    if (foundThing) {
      reply.found(message, foundThing, pointsName)
      // if not, reply with error
    } else {
      reply.notFound(message, thingName)
    }
    if (debugFlag) reply.sendDebug(message, debugLog)
  }
}
