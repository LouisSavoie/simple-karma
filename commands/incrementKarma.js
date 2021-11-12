// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')
const undo = require('./undo')
const newThing = require('./newThing')

module.exports = {
  name: 'incrementKarma',
  description: 'Increments karma for a thing',
  async execute (message, thingName, debugLog, debugFlag, addUndoFlag, pointsName) {
    // check if the command issuer is the thing being incremented
    if (thingName.includes(message.member.displayName)) {
      reply.karmaYourselfError(message, pointsName)
    } else {
      // check if the database has the thing
      const [foundThing, debugDB] = await db.findOne(message.guild.id, thingName)

      // debug
      const debug = `  DEBUG: 2. incrementKarma.js, foundThing: ${foundThing}`
      console.log(debug)
      debugLog += '\n' + debugDB + '\n' + debug

      // if thing is found, increment thing's karma then send reply to the message's channel with thing's karma
      if (foundThing) {
        foundThing.karma += 1
        foundThing.save()
        reply.found(message, foundThing, pointsName)
        if (addUndoFlag) {
          undo.execute(null, message, foundThing, 'decrement', debugLog, debugFlag, null)
          debugFlag = false
        }
        if (debugFlag) reply.sendDebug(message, debugLog)

        // ARCHIVED KARMA CAPPED CODE: SAVE FOR FUTURE RE-IMPLEMENTATION
        // if it does, check if the thing's karma is over 9000
        // if it is, send reply to message's channel with error
        // if (foundThing.karma >= 9001) {
        //   reply.capped(message, thingName, pointsName)
        // if it isn't, increment thing's karma then send reply to the message's channel with thing's karma
        // } else {
        // }

        // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
      } else {
        reply.notFoundCreated(message, thingName)
        newThing.execute(message, thingName, debugLog, debugFlag, { karma: 1 }, true)
      }
    }
  }
}
