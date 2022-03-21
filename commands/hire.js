// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')
const undo = require('./undo')

module.exports = {
  name: 'hire',
  description: 'Creates a new admin',
  async execute (message, adminName, adminID, debugLog, debugFlag, addUndoFlag, supportServer) {
    if (message.member.hasPermission('ADMINISTRATOR') || message.guild.id === supportServer) {
      // check if the database already has the admin
      const [foundAdmin, debugDB] = await db.findAdmin(message.guild.id, adminID)

      // debug
      const debug = `  DEBUG: 2. hire.js, foundAdmin: ${foundAdmin ? foundAdmin.adminID : foundAdmin}`
      console.log(debug)
      debugLog += '\n' + debugDB + '\n' + debug

      // if it does, send reply to the massage's channel explaining so
      if (foundAdmin) {
        reply.adminAlreadyHired(message, foundAdmin)
      // if it doesn't, hire the admin then send reply to the message's channel confirming it's employment
      } else {
        const newAdmin = await db.hire(message.guild.id, adminID, adminName)
        if (newAdmin) {
          reply.adminHired(message, newAdmin)
          if (addUndoFlag) {
            undo.execute(null, message, newAdmin, 'fire', debugLog, debugFlag, null)
            debugFlag = false
          }
        } else {
          reply.adminNotHired(message, adminName)
        }
      }
      if (debugFlag) reply.sendDebug(message, debugLog)
    } else {
      reply.noPermission(message)
    }
  }
}
