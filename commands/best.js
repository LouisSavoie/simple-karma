// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'best',
  description: 'Displays the best 5 things with the highest karma',
  async execute (message) {
    // get the things from the database
    const foundThings = await db.findBest(message.guild.id)

    // debug
    console.log('DEBUG: 2. topFIve.js, things: ' + foundThings)

    // if things are found, reply with the things
    if (foundThings) {
      reply.bestFound(message, foundThings)
      // if not, reply with error
    } else {
      reply.bestNotFound(message)
    }
  }
}
