// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'newThing',
  description: 'Creates a new thing',
  async execute (message, thingName) {
    // check if the database already has the thing
    const foundThing = await db.findOne(message.guild.id, thingName)

    // debug
    console.log('DEBUG: 2. newTing.js, foundThing: ' + foundThing)

    // if it does, send reply to the massage's channel explaining so
    if (foundThing) {
      reply.thingAlreadyExists(message, foundThing)
      // if it doesn't, create the thing then send reply to the message's channel confirming it's creation
    } else {
      const newThing = await db.create(message.guild.id, thingName)
      if (newThing) {
        reply.thingCreated(message, newThing)
      } else {
        reply.thingNotCreated(message, thingName)
      }
    }
  }
}
