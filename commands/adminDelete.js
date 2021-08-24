// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'adminDelete',
  description: 'Deletes a thing',
  async execute (message, thingName, debugLog, debugFlag, undoFlag) {
    // create debugDB variable to handle DM'ing in different cases and debug variable for wider scope
    let debugDB = ''
    let debug = ''

    // if the message author has permission, proceed
    if (message.member.hasPermission('ADMINISTRATOR') || undoFlag) {
      // check if the database has the thing
      const [foundThing, debugDBThing] = await db.findOne(message.guild.id, thingName)
      debugDB += debugDBThing

      // debug
      debug += `  DEBUG: 2. adminDelete.js, foundThing: ${foundThing}`
      console.log(debug)

      // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
      if (!foundThing) {
        reply.notFound(message, thingName)
        // if it does, delete it and send success reply
      } else {
        const [res, debugDBDelete] = await db.deleteOne(message.guild.id, foundThing.name)
        debugDB += debugDBDelete

        // debug
        debug += `  DEBUG: 2. adminDelete.js, res: ${res}`
        console.log('  DEBUG: 2. adminDelete.js, res: ' + res)

        if (res === 1) {
          reply.thingDeleted(message, foundThing.name)
        } else {
          reply.thingNotDeleted(message, foundThing.name)
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
