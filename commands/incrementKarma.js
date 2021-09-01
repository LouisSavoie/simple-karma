// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')
const undo = require('./undo')
const newThing = require('./newThing')

module.exports = {
  name: 'incrementKarma',
  description: 'Increments karma for a thing',
  async execute (message, thingName, debugLog, debugFlag, addUndoFlag) {
    // check if the command issuer is the thing being incremented
    if (thingName.includes(message.member.displayName)) {
      reply.karmaYourselfError(message, thingName)
    } else {
      // check if the database has the thing
      const [foundThing, debugDB] = await db.findOne(message.guild.id, thingName)

      // debug
      const debug = `DEBUG: 2. incrementKarma.js, foundThing: ${foundThing}`
      console.log(debug)

      // if it does, check if the thing's karma is over 9000
      if (foundThing) {
        // if it is, send reply to message's channel with error
        if (foundThing.karma >= 9001) {
          reply.capped(message, thingName)
          // if it isn't, increment thing's karma then send reply to the message's channel with thing's karma
        } else {
          foundThing.karma += 1
          foundThing.save()
          reply.found(message, foundThing)
          if (addUndoFlag) undo.execute(null, message, foundThing, 'decrement', null, null)
          // if debugFlag, DM debug
          if (debugFlag) {
            message.author.send([
              debugLog,
              debugDB,
              debug
            ])
          }
        }
        // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
      } else {
        reply.notFoundCreated(message, thingName)
        newThing.execute(message, thingName, debugLog, debugFlag, {karma: +1}, true)
      }
    }
  }
}
