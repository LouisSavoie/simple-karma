const db = require('../functions/database')
const reply = require('../functions/reply')
const undo = require('./undo')

module.exports = {
  name: 'delete',
  description: 'Deletes a thing for admins, or trolls the regular user',
  async execute (message, thingName, debugLog, debugFlag, pointsName, undoFlag, addUndoFlag, supportServer) {
    // if the message author has permission, proceed
    const [isAdmin, debugIsAdmin] = await db.isAdmin(message.guild.id, message.member.id)
    debugLog += '\n' + debugIsAdmin
    if (message.member.hasPermission('ADMINISTRATOR') || message.guild.id === supportServer || undoFlag || isAdmin) {
      if (thingName === "*") {
        const [res, debugDBDeleteAll] = await db.deleteAll(message.guild.id)
        debugLog += '\n' + debugDBDeleteAll

        // debug
        const debugDelete = `  DEBUG: 2. delete.js (admin), res: ${res}`
        console.log(debugDelete)
        debugLog += '\n' + debugDelete

        if (res > 0) {
          reply.allDeleted(message)
        } else {
          reply.allNotDeleted(message)
        }
      } else {
        // check if the database has the thing
        const [foundThing, debugDBThing] = await db.findOne(message.guild.id, thingName)
        debugLog += '\n' + debugDBThing

        // debug
        const debugThing = `  DEBUG: 2. delete.js (admin), foundThing: ${foundThing ? foundThing.name : foundThing}`
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
          const debugDelete = `  DEBUG: 2. delete.js (admin), res: ${res}`
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
      }
    // if message author does not have permission, send error reply, run trollDelete code
    } else {
      reply.noPermission(message)

      // check if the command issuer is the thing being deleted
      if (thingName.includes(message.member.displayName)) {
        reply.trollDeleteYourselfError(message)
        if (debugFlag) reply.sendDebug(message, debugLog)
      } else {
        // check if the database has the the user that issued the command as a thing
        const [foundUser, debugDBUser] = await db.findOne(message.guild.id, '@' + message.member.displayName)
        debugLog += '\n' + debugDBUser

        // debug
        const debug2a = `  DEBUG: 2a. delete.js (troll), foundUser: ${foundUser ? foundUser.name : foundUser}`
        console.log(debug2a)
        debugLog += '\n' + debug2a

        // if it does, continue
        if (foundUser) {
          // if user has non-positive karma throw error, else continue
          if (foundUser.karma <= 0) {
            reply.notEnoughKarma(message, pointsName)
          } else {
            // check if the database has the thing
            const [foundThing, debugDBThing] = await db.findOne(message.guild.id, thingName)
            debugLog += '\n' + debugDBThing

            // debug
            const debug2b = `  DEBUG: 2b. delete.js (troll), foundThing: ${foundThing ? foundThing.name : foundThing}`
            console.log(debug2b)
            debugLog += '\n' + debug2b

            // if it does, create undo, reroute debug, take the user's karma and give it to the thing
            if (foundThing) {
              const undoStuff = { thingName: foundThing.name, thingKarma: foundThing.karma, userName: foundUser.name, userKarma: foundUser.karma }
              undo.execute(null, message, undoStuff, 'untroll', debugLog, debugFlag, null)
              debugFlag = false
              foundThing.karma += foundUser.karma
              foundThing.save()
              foundUser.karma = 0
              foundUser.save()
              // then send reply to the message's channel with the bad news, lol
              reply.deleteTrolled(message, foundUser, foundThing, pointsName)
              // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
            } else {
              reply.notFound(message, thingName)
            }
          }
          // if it doesn't, send reply to the message's channel with error
        } else {
          reply.userNotInDatabase(message, message.member.displayName)
        }
      }
    }
    if (debugFlag) reply.sendDebug(message, debugLog)
  }
}
