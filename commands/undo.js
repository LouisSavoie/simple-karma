// Undo Object, keys are guild.id, values are arrays of undo objects for the keys server
let undos = {}

module.exports = {
  name: 'undo',
  description: 'Tracks changes to things and can revert them',
  async execute (commands, message, thing, undoCommand, debugLog, debugFlag) {

    // ADD SERVER TO UNDO OBJECT
    if (!(message.guild.id in undos)) {
      undos[message.guild.id] = []
      // console.log(`  DEBUG: app.js, added ${serverID} to undo: ${JSON.stringify(undo)}`)
    }

    if (commands === null) {
      undos[message.guild.id].push({ thing: thing, command: undoCommand })
      // console.log(`  DEBUG: undo.js: created new undo: ${undoCommand} ${thing.name}`)
    } else {
      const undo = undos[message.guild.id].pop()
      // console.log(`  DEBUG: undo.js: popped undo object: ${undo.thing.name} ${undo.command}`)
      switch(undo.command) {
        case 'delete':
          // console.log(`  DEBUG: undo.js: reached delete case for ${undo.thing.name}`)
          commands.get('adminDelete').execute(message, undo.thing.name, debugLog, debugFlag, true)
          break;
        default:
          console.log(`  DEBUG: undo.js: reached default case`)
      }
    }
  }
}
