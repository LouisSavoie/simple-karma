// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')
const undo = require('./undo')
const newThing = require('./newThing')

module.exports = {
  name: 'decrementKarma',
  description: 'Decrements karma for a thing',
  async execute (message, thingName, debugLog, debugFlag, addUndoFlag, pointsName) {
    // check if the database has the thing
    const [foundThing, debugDB] = await db.findOne(message.guild.id, thingName)

    // debug
    const debug = `  DEBUG: 2. decrementKarma.js, foundThing: ${foundThing}`
    console.log(debug)

    // if it does, decrement thing's karma then send reply to the message's channel with thing's karma
    if (foundThing) {
      foundThing.karma -= 1
      foundThing.save()
      reply.found(message, foundThing, pointsName)
      if (addUndoFlag) undo.execute(null, message, foundThing, 'increment', null, null, pointsName)
      // if debugFlag, DM debug
      if (debugFlag) {
        message.author.send([
          debugLog,
          debugDB,
          debug
        ])
      }
      // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
    } else {
      debugLog += '\n' + debugDB + '\n' + debug
      reply.notFoundCreated(message, thingName)
      newThing.execute(message, thingName, debugLog, debugFlag, { karma: -1 }, true)
    }
  }
}
