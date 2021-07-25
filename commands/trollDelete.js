// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'trollDelete',
  description: 'Transfers karma from user issuing the command to the thing they tried to delete.',
  async execute (message, thingName) {
    // check if the command issuer is the thing being deleted
    if (!thingName.includes(message.member.displayName)) {
      // create regex for finding the command issuer
      const regex = new RegExp(message.member.displayName, 'i')
      // check if the database has the the user that issued the command as a thing
      const foundUser = await db.findOne(message.guild.id, regex)

      // debug
      console.log('DEBUG: 2. trollDelete.js, foundUser: ' + foundUser)

      // if it does, continue
      if (foundUser) {
        // if user has non-positive karma throw error, else continue
        if (foundUser.karma <= 0) {
          reply.notEnoughKarma(message)
        } else {
          // check if the database has the thing
          const foundThing = await db.findOne(message.guild.id, thingName)

          // debug
          console.log('DEBUG: 3. trollDelete.js, foundThing: ' + foundThing)

          // if it does, take the user's karma and give it to the thing
          if (foundThing) {
            foundThing.karma += foundUser.karma
            foundThing.save()
            foundUser.karma = 0
            foundUser.save()
            // then send reply to the message's channel with the bad news, lol
            reply.deleteTrolled(message, foundUser, foundThing)
            // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
          } else {
            reply.notFound(message, thingName)
          }
        }
        // if it doesn't, send reply to the message's channel with error
      } else {
        reply.userNotInDatabase(message, message.member.displayName)
      }
    } else {
      reply.trollDeleteYourselfError(message)
    }
  }
}
