const db = require('../functions/database')
const reply = require('../functions/reply')
const undo = require('./undo')

module.exports = {
  name: 'rename',
  description: 'Renames a thing',
  async execute (message, thingName, value, debugLog, debugFlag, undoFlag, addUndoFlag, pointsName) {
    // create debugDB variable to handle DM'ing in different cases and debug variable for wider scope
    let debugDB = ''
    let debug = ''

    // if the message author has permission, proceed
    if (message.member.hasPermission('ADMINISTRATOR') || undoFlag) {
      // check if the database has the thing
      const [foundThing, debugDBThing] = await db.findOne(message.guild.id, thingName)
      debugDB += debugDBThing

      // debug
      debug += `  DEBUG: 2. rename.js, foundThing: ${foundThing}`
      console.log(debug)

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
          debugLog += '\n' + debugDB + '\n' + debug
          undo.execute(null, message, foundThing, 'rename', debugLog, debugFlag, null)
          debugFlag = false
        }
      }
      // if message author does not have permission, send error reply
    } else {
      reply.noPermission(message)
    }

    // if debugFlag, DM debug
    if (debugFlag) {
      message.author.send([
        debugLog,
        debugDB,
        debug
      ])
    }
  }
}
