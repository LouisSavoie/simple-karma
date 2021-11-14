// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')
const undo = require('./undo')

module.exports = {
  name: 'trollDelete',
  description: 'Transfers karma from user issuing the command to the thing they tried to delete.',
  async execute (message, thingName, debugLog, debugFlag, pointsName) {
    // check if the command issuer is the thing being deleted
    if (thingName.includes(message.member.displayName)) {
      reply.trollDeleteYourselfError(message)
      if (debugFlag) reply.sendDebug(message, debugLog)
    } else {
      // check if the database has the the user that issued the command as a thing
      const [foundUser, debugDBUser] = await db.findOne(message.guild.id, '@' + message.member.displayName)
      debugLog += '\n' + debugDBUser

      // debug
      let debug2a = `  DEBUG: 2a. trollDelete.js, foundUser: ${foundUser}`
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
          let debug2b = `  DEBUG: 2b. trollDelete.js, foundThing: ${foundThing}`
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
      if (debugFlag) reply.sendDebug(message, debugLog)
    }
  }
}
