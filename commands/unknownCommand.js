// Require functions
const reply = require('../functions/reply')

module.exports = {
  name: 'unknownCommand',
  description: 'Replies that command is unknown',
  execute (message) {
    reply.unknownCommand(message)
  }
}
