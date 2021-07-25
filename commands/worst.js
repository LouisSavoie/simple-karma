// Require functions
const db = require('../functions/database')
const reply = require('../functions/reply')

module.exports = {
  name: 'worst',
  description: 'Displays the worst 5 things with the lowest karma',
  async execute (message) {
    // get the things from the database
    const foundThings = await db.findWorst(message.guild.id)

    // debug
    console.log('DEBUG: 2. worst.js, things: ' + foundThings)

    // if things are found, reply with the things
    if (foundThings) {
      reply.worstFound(message, foundThings)
      // if not, reply with error
    } else {
      reply.worstNotFound(message)
    }
  }
}
