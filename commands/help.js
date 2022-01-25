const reply = require('../functions/reply')

module.exports = {
  name: 'help',
  description: 'Sends help info.',
  execute (message, debugLog, debugFlag) {
    message.reply([
      '__**Commands:**__',
      '**`sk help`**: Shows this!',
      '**`sk <thing>`**: Shows a thing\'s points',
      '**`sk new <thing>`**: Creates a new thing',
      '**`sk search <value>`**: DMs a list of things that contain the value, `*` returns all',
      '**`sk best <value>` & `sk worst <value>`**: Lists the best or worst things, 5 by default or given value',
      '**`sk + <thing>` & `sk - <thing>`**: Increments or Decrements a thing\'s points. If it doesn\'t exist, it is created',
      'Notes:',
      '*- Prefix, commands, and thing names are case insensitive.*',
      '*- Thing names in parentheses can have spaces.*',
      '*- User Thing names with spaces must have a space between the `@` and the rest of the name.*',
      '  *- Example: `(@ Joe User)` for `@Joe User`*',
      '*- Add `debug` anywhere in any command to have debug info DM\'d to you.*'
    ])

    message.reply([
      '__**ADMIN Commands:**__ (Requires Server Admin Permissions)',
      '**`sk set <thing> <value>`**: Sets a thing\'s points to the value',
      '**`sk rename <thing> <value>`**: Renames a thing to the value',
      '**`sk delete <thing>`**: Deletes a thing',
      '**`sk undo`**: Undoes the last command that changed a thing',
      '**`sk namepoints <value>`**: Renames server points the value',
      '__**Links**__:',
      '**Invite SK to your server!**: <https://bit.ly/SKinvite>',
      '**Support Discord Server**: <https://bit.ly/SKsupport>: Try out SK, talk to other server Admins or myself!',
      '**Issues or suggestions**: <https://bit.ly/SKissues>: Please include either `Issue: ` or `Suggestion: ` in your title, thanks!',
      '*When reporting bugs in commands, please re-run the command with `debug` and include the DM you get in your bug report. Thanks!*',
      '**My Portfolio Website**: <https://bit.ly/LouisSavoie>',
      '**Donations welcome!**: <https://bit.ly/SKdonate>'
    ])

    if (debugFlag) reply.sendDebug(message, debugLog)
  }
}
