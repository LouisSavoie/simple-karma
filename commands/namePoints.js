const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'namePoints',
  description: 'Sets the name of the points for a server object',
  async execute (message, pointsName, debugLog, debugFlag) {
    // check if the database already has the server
    const [foundServer, debugDB] = await db.findServer(message.guild.id)

    // debug
    const debug = `  DEBUG: 2. namePoints.js, foundServer: ${foundServer}`
    console.log(debug)

    // if it does, change the name of the points then send reply confirming the change
    if (foundServer) {
      foundServer.pointsName = pointsName
      foundServer.save()
      reply.pointsNameSet(message, pointsName)
      // if it doesn't, create the server then send reply to the message's channel confirming it's creation
    } else {
      const newThing = await db.createServer(message.guild.id, pointsName)
      if (newThing) {
        reply.pointsNameSet(message, pointsName)
      } else {
        reply.serverNotCreated(message)
      }
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
