// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'adminSet',
  description: 'Increments karma for a thing',
  async execute (message, thingName, value, debugLog, debugFlag) {
    // create debugDB variable to handle DM'ing in different cases and debug variable for wider scope
    let debugDB = ''
    let debug = ''

    // if the message author has permission, proceed
    if (message.member.hasPermission('ADMINISTRATOR')) {
      value = parseInt(value, 10)
      // check if value is a number
      if (!isNaN(value)) {
        // check if the database has the thing
        const [foundThing, debugDBThing] = await db.findOne(message.guild.id, thingName)
        debugDB += debugDBThing

        // debug
        debug += `  DEBUG: 2. adminSet.js, foundThing: ${foundThing}`
        console.log(debug)

        // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
        if (!foundThing) {
          reply.notFound(message, thingName)
          // if it does, set the karma to the value and send seccess reply
        } else {
          foundThing.karma = value
          foundThing.save()
          reply.found(message, foundThing)
        }
      } else {
        reply.notANumber(message, value)
      }
      // if message author does not have permission, send error reply
    } else {
      reply.noPermission(message)
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
