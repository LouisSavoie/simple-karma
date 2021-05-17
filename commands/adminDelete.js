// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'adminDelete',
  description: 'Increments karma for a thing',
  async execute (message, thingName, value) {
    // if the message author has permission, proceed
    if (message.member.hasPermission('ADMINISTRATOR')) {
      // check if the database has the thing
      const foundThing = await db.findOne(thingName)

      // debug
      console.log('DEBUG: 2. adminDelete.js, foundThing: ' + foundThing)

      // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
      if (!foundThing) {
        reply.notFound(message, thingName)
        // if it does, delete it and send seccess reply
      } else {
        const res = await db.deleteOne(foundThing.name)

        // debug
        console.log('DEBUG: 2. adminDelete.js, res: ' + res)

        if (res == 1) {
          reply.thingDeleted(message, foundThing.name)
        } else {
          reply.thingNotDeleted(message, foundThing.name)
        }
      }
      // if message author does not have permission, send error reply
    } else {
      reply.noPermission(message)
    }
  }
}
