const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'undo',
  description: 'Undoes previous command that changed a thing',
  async execute (undo, debugLog, debugFlag) {
    if (undo === undefined) {
      console.log(`  DEBUG: undo.js: undo is undefined`)
    } else {
      switch(undo.command) {
        case 'delete':
          console.log(`  DEBUG: undo.js: reached delete case for ${undo.thing}`)
          break;
        default:
          console.log(`  DEBUG: undo.js: reached default case`)
      }
    }
    
    // // check if the database already has the thing
    // const [foundThing, debugDB] = await db.findOne(message.guild.id, thingName)

    // // debug
    // const debug = `  DEBUG: 2. newThing.js, foundThing: ${foundThing}`
    // console.log(debug)

    // // if it does, send reply to the massage's channel explaining so
    // if (foundThing) {
    //   reply.thingAlreadyExists(message, foundThing)
    //   // if it doesn't, create the thing then send reply to the message's channel confirming it's creation
    // } else {
    //   const newThing = await db.create(message.guild.id, thingName)
    //   if (newThing) {
    //     reply.thingCreated(message, newThing)
    //   } else {
    //     reply.thingNotCreated(message, thingName)
    //   }
    // }

    // // if debugFlag, DM debug
    // if (debugFlag) {
    //   message.author.send([
    //     debugLog,
    //     debugDB,
    //     debug
    //   ])
    // }
  }
}
