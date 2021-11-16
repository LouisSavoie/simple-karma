// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')
const undo = require('./undo')

module.exports = {
  name: 'adminDelete',
  description: 'Deletes a thing',
  async execute (message, thingName, debugLog, debugFlag, undoFlag, addUndoFlag) {
    // if the message author has permission, proceed
    if (message.member.hasPermission('ADMINISTRATOR') || undoFlag) {
      // check if the database has the thing
      const [foundThing, debugDBThing] = await db.findOne(message.guild.id, thingName)
      debugLog += '\n' + debugDBThing

      // debug
      const debugThing = `  DEBUG: 2. adminDelete.js, foundThing: ${foundThing}`
      console.log(debugThing)
      debugLog += '\n' + debugThing

      // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
      if (!foundThing) {
        reply.notFound(message, thingName)
        // if it does, delete it and send success reply
      } else {
        const [res, debugDBDelete] = await db.deleteOne(message.guild.id, foundThing.name)
        debugLog += '\n' + debugDBDelete

        // debug
        const debugDelete = `  DEBUG: 2. adminDelete.js, res: ${res}`
        console.log(debugDelete)
        debugLog += '\n' + debugDelete

        if (res === 1) {
          reply.thingDeleted(message, foundThing.name)
          if (addUndoFlag) {
            undo.execute(null, message, foundThing, 'create', debugLog, debugFlag, null)
            debugFlag = false
          }
        } else {
          reply.thingNotDeleted(message, foundThing.name)
        }
      }
      // if message author does not have permission, send error reply
    } else {
      reply.noPermission(message)
    }
    if (debugFlag) reply.sendDebug(message, debugLog)
  }
}
