const db = require('../functions/database')
const reply = require('../functions/reply')
// Undo Object, keys are guild.id, values are arrays of undo objects for the keys server
const undos = {}

module.exports = {
  name: 'undo',
  description: 'Tracks changes to things and can revert them',
  async execute (commands, message, thing, undoCommand, debugLog, debugFlag, pointsName, supportServer) {
    // ADD SERVER TO UNDO OBJECT
    if (!(message.guild.id in undos)) {
      undos[message.guild.id] = []
      // console.log(`  DEBUG: app.js, added ${serverID} to undo: ${JSON.stringify(undo)}`)
    }

    if (commands === null) {
      undos[message.guild.id].push({ thing: thing, command: undoCommand })
      const debugUndo = `  DEBUG: 3. undo.js, undo created: ${JSON.stringify(undos[message.guild.id][undos[message.guild.id].length - 1])}`
      console.log(debugUndo)
      debugLog += '\n' + debugUndo
      if (debugFlag) reply.sendDebug(message, debugLog)
    } else {
      const [isAdmin, debugIsAdmin] = await db.isAdmin(message.guild.id, message.member.id)
      debugLog += '\n' + debugIsAdmin
      if (message.member.hasPermission('ADMINISTRATOR') || message.guild.id === supportServer || isAdmin) {
        if (undos[message.guild.id].length) {
          const undo = undos[message.guild.id].pop()
          // console.log(`  DEBUG: undo.js: popped undo object: ${undo.thing.name} ${undo.command}`)
          switch (undo.command) {
            case 'delete':
              // console.log(`  DEBUG: undo.js: reached delete case for ${undo.thing.name}`)
              commands.get('delete').execute(message, undo.thing.name, debugLog, debugFlag, pointsName, true, false, supportServer)
              break
            case 'create':
              // console.log(`  DEBUG: undo.js: reached create case for ${undo.thing.name}`)
              commands.get('newThing').execute(message, undo.thing.name, debugLog, debugFlag, undo.thing, false)
              break
            case 'decrement':
              // console.log(`  DEBUG: undo.js: reached decrement case for ${undo.thing.name}`)
              commands.get('decrementKarma').execute(message, undo.thing.name, debugLog, debugFlag, false, pointsName)
              break
            case 'increment':
              // console.log(`  DEBUG: undo.js: reached increment case for ${undo.thing.name}`)
              commands.get('incrementKarma').execute(message, undo.thing.name, debugLog, debugFlag, false, pointsName)
              break
            case 'rename':
              // console.log(`  DEBUG: undo.js: reached rename case for ${undo.thing.name}`)
              commands.get('rename').execute(message, undo.thing.name, undo.thing.value, debugLog, debugFlag, true, false, pointsName, supportServer)
              break
            case 'set':
              // console.log(`  DEBUG: undo.js: reached set case for ${undo.thing.name}`)
              commands.get('set').execute(message, undo.thing.name, undo.thing.value, debugLog, debugFlag, true, false, pointsName, supportServer)
              break
            case 'add':
            // console.log(`  DEBUG: undo.js: reached add case for ${undo.thing.name}`)
            commands.get('add').execute(message, undo.thing.name, undo.thing.value, debugLog, debugFlag, true, false, pointsName, supportServer)
            break
            case 'untroll':
              commands.get('set').execute(message, undo.thing.thingName, undo.thing.thingKarma, debugLog, debugFlag, true, false, pointsName, supportServer)
              commands.get('set').execute(message, undo.thing.userName, undo.thing.userKarma, debugLog, debugFlag, true, false, pointsName, supportServer)
              break
            case 'hire':
              commands.get('hire').execute(message, undo.thing.adminName, undo.thing.adminID, debugLog, debugFlag, false, supportServer)
              break
            case 'fire':
              commands.get('fire').execute(message, undo.thing.adminName, undo.thing.adminID, debugLog, debugFlag, false, supportServer)
              break
            default:
              console.log('  DEBUG: undo.js: reached default case')
              reply.noUndoCase(message)
          }
          if (undos[message.guild.id].length) {
            reply.nextUndo(message, undos[message.guild.id][undos[message.guild.id].length - 1])
          } else {
            reply.noUndoNext(message)
          }
        } else {
          reply.noUndoCase(message)
        }
      } else {
        reply.noPermission(message)
      }
    }
  }
}
