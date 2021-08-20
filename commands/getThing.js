// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'getThing',
  description: 'Displays a thing',
  async execute (message, thingName, debugLog, debugFlag) {
    // check if the database has the thing
    const [foundThing, debugDB] = await db.findOne(message.guild.id, thingName)

    // debug
    const debug = `  DEBUG: 2. getThing.js, thing: ${foundThing}`
    console.log(debug)

    // if it does, reply with the thing
    if (foundThing) {
      reply.found(message, foundThing)
      // if not, reply with error
    } else {
      reply.notFound(message, thingName)
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
