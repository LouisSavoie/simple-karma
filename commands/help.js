const reply = require('../functions/reply')

module.exports = {
  name: 'help',
  description: 'Sends help info.',
  execute (message, debugLog, debugFlag) {
    message.reply([
      '__**Commands:**__',
      '**`sk help`**: Shows this!',
      '**`sk new <thing>`**: Creates a new thing',
      '**`sk search <string>`**: DMs you a list of things with names that contain the string, `*` returns all',
      '**`sk best <# of results>`**: Shows a list of the best things by points, 5 by default',
      '**`sk worst <# of results>`**: Shows a list of the worst things by points, 5 by default',
      '**`sk <thing>`**: Shows a thing\'s points',
      '**`sk + <thing>`**: Increments a thing\'s points. If it doesn\'t exist, it is created',
      '**`sk - <thing>`**: Decrements a thing\'s points. If it doesn\'t exist, it is created',
      'Notes:',
      '*- Prefix, commands, and thing names are case insensitive.*',
      '*- Thing names in parentheses can have spaces.*',
      '*- User Thing names with spaces must have a space between the `@` and the rest of the name.*',
      '  *- Example: `(@ Joe User)` for `@Joe User`*',
      '*- Add `debug` anywhere in any command to have debug info DM\'d to you.*',
    ])

    message.reply([
      '__**ADMIN Commands:**__ (Requires Server Admin Permissions)',
      '**`sk set <thing> <value>`**: Sets a thing\'s points to the value',
      '**`sk rename <thing> <value>`**: Renames a thing to the value',
      '**`sk delete <thing>`**: Deletes a thing',
      '**`sk undo`**: Undoes the last command that changed a thing',
      '**`sk namepoints <name>`**: Sets the name for points to the name.',
      '__**Links**__:',
      '**Invite SK to your server!**: <https://discord.com/api/oauth2/authorize?client_id=831293373913890856&permissions=0&scope=bot>',
      '**Support Discord Server**: <https://discord.gg/EyTxcAQbtC>: Try out SK, talk to other server Admins or myself!',
      '**Issues or suggestions**: <https://github.com/LouisSavoie/simple-karma/issues>: Please include either `Issue: ` or `Suggestion: ` in your title, thanks!',
      '*When reporting bugs in commands, please re-run the command with `debug` and include the DM you get in your bug report. Thanks!*',
      '**My Portfolio Website**: <https://www.louissavoie.com>',
      '**Donations welcome!**: <https://www.paypal.com/donate?business=2MV2PUZGP3XLC&no_recurring=1&item_name=SimpleKarma&currency_code=USD>'
    ])

    if (debugFlag) reply.sendDebug(message, debugLog)
  }
}
