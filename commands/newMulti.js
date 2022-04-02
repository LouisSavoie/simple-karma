// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')
// const undo = require('./undo')

module.exports = {
  name: 'newMulti',
  description: 'Creates multiple new things',
  async execute (message, thingsArray, debugLog, debugFlag, addUndoFlag) {
    // if the message author has permission, proceed
    const [isAdmin, debugIsAdmin] = await db.isAdmin(message.guild.id, message.member.id)
    debugLog += '\n' + debugIsAdmin
    if (message.member.hasPermission('ADMINISTRATOR') || message.guild.id === supportServer || undoFlag || isAdmin) {
      // check if the database already has any of the things
      const [foundThings, debugDB] = await db.findMulti(message.guild.id, thingsArray)

      // debug
      const debug = `  DEBUG: 2. newMulti.js, foundThings: ${foundThings}`
      console.log(debug)
      debugLog += '\n' + debugDB + '\n' + debug

      // if any of them does, send reply to the massage's channel explaining so
      if (foundThings.length() == thingsArray.length()) {
        reply.thingsAlreadyExist(message)
      // if it doesn't, create the things then send reply to the message's channel confirming their creation
      } else {
        const newThingsRes = await db.createThings(message.guild.id, thingsArray)
        if (newThingsRes) {
          reply.thingsCreated(message)
          if (addUndoFlag) {
            // TODO: implement multiDelete
            // undo.execute(null, message, newThing, 'delete', debugLog, debugFlag, null)
            // debugFlag = false
          }
        } else {
          reply.thingsNotCreated(message)
        }
      }
      if (debugFlag) reply.sendDebug(message, debugLog)
    }
  }
}