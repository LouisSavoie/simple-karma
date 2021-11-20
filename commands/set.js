// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')
const undo = require('./undo')

module.exports = {
  name: 'set',
  description: 'Sets karma for a thing to a given value',
  async execute (message, thingName, value, debugLog, debugFlag, undoFlag, addUndoFlag, pointsName) {
    // if the message author has permission, proceed
    if (message.member.hasPermission('ADMINISTRATOR') || message.guild.id == '891440040037711902' || undoFlag) {
      value = parseInt(value, 10)
      // check if value is a number
      if (!isNaN(value)) {
        if (value <= 1000000000000000) {
          // check if the database has the thing
          const [foundThing, debugDBThing] = await db.findOne(message.guild.id, thingName)
          debugLog += '\n' + debugDBThing

          // debug
          const debug = `  DEBUG: 2. set.js, foundThing: ${foundThing ? foundThing.name : foundThing}`
          console.log(debug)
          debugLog += '\n' + debug

          // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
          if (!foundThing) {
            reply.notFound(message, thingName)
            // if it does, set the karma to the value and send success reply
          } else {
            const oldKarma = foundThing.karma
            foundThing.karma = value
            foundThing.save()
            reply.found(message, foundThing, pointsName)
            foundThing.value = oldKarma
            if (addUndoFlag) {
              undo.execute(null, message, foundThing, 'set', debugLog, debugFlag, null)
              debugFlag = false
            }
          }
        } else {
          reply.valueTooLarge(message, value)
        }
      } else {
        reply.notANumber(message, value)
      }
      // if message author does not have permission, send error reply
    } else {
      reply.noPermission(message)
    }
    if (debugFlag) reply.sendDebug(message, debugLog)
  }
}
