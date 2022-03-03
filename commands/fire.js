// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')
const undo = require('./undo')

module.exports = {
  name: 'fire',
  description: 'Deletes an admin',
  async execute (message, adminName, adminID, debugLog, debugFlag, addUndoFlag, supportServer) {
    if (message.member.hasPermission('ADMINISTRATOR') || message.guild.id === supportServer) {
      // check if the database has the admin
      const [foundAdmin, debugDB] = await db.findAdmin(message.guild.id, adminID)

      // debug
      const debug = `  DEBUG: 2. fire.js, foundAdmin: ${foundAdmin ? foundAdmin.adminID : foundAdmin}`
      console.log(debug)
      debugLog += '\n' + debugDB + '\n' + debug

      // if it does't, send reply to message's channel with error
      if (!foundAdmin) {
        reply.adminNotFound(message, adminName)
      // if it does, fire the admin then send reply to the message's channel confirming it's termination
      } else {
        const [res, debugDBfire] = await db.fire(message.guild.id, foundAdmin.adminID)
        debugLog += '\n' + debugDBfire

        // debug
        const debugFire = `  DEBUG: 2. fire.js, res: ${res}`
        console.log(debugFire)
        debugLog += '\n' + debugFire

        if (res === 1) {
          reply.adminFired(message, foundAdmin.adminName)
          if (addUndoFlag) {
            undo.execute(null, message, foundAdmin, 'hire', debugLog, debugFlag, null)
            debugFlag = false
          }
        } else {
          reply.adminNotFired(message, foundAdmin.adminName)
        }
      }
      if (debugFlag) reply.sendDebug(message, debugLog)
    } else {
      reply.noPermission(message)
    }
  }
}
