// Require functions
const reply = require('../functions/reply')

module.exports = {
  name: 'unknownCommand',
  description: 'Replies that command is unknown',
  execute (message, debugLog, debugFlag) {
    reply.unknownCommand(message)
    // if debugFlag, DM debug
    if (debugFlag) {
      reply.sendDebug(message, debugLog)
    }
  }
}
