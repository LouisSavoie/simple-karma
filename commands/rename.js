const db = require('../functions/database')
const reply = require('../functions/reply')
const undo = require('./undo')

module.exports = {
  name: 'rename',
  description: 'Renames a thing',
  async execute (message, thingName, value, debugLog, debugFlag, undoFlag, addUndoFlag, pointsName, supportServer) {
    // if the message author has permission, proceed
    const [isAdmin, debugIsAdmin] = await db.isAdmin(message.guild.id, message.member.id)
    debugLog += '\n' + debugIsAdmin
    if (message.member.hasPermission('ADMINISTRATOR') || message.guild.id === supportServer || undoFlag || isAdmin) {
      // check if the database has the thing
      const [foundThing, debugDBThing] = await db.findOne(message.guild.id, thingName)
      debugLog += '\n' + debugDBThing

      // debug
      const debug = `  DEBUG: 2. rename.js, foundThing: ${foundThing ? foundThing.name : foundThing}`
      console.log(debug)
      debugLog += '\n' + debug

      // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
      if (!foundThing) {
        reply.notFound(message, thingName)
        // if it does, set the karma to the value and send success reply
      } else {
        foundThing.name = value
        foundThing.nameLower = value.toLowerCase()
        foundThing.save()
        reply.found(message, foundThing, pointsName)
        foundThing.value = thingName
        if (addUndoFlag) {
          undo.execute(null, message, foundThing, 'rename', debugLog, debugFlag, null)
          debugFlag = false
        }
      }
      // if message author does not have permission, send error reply
    } else {
      reply.noPermission(message)
    }
    if (debugFlag) reply.sendDebug(message, debugLog)
  }
}
