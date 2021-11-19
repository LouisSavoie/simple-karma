const reply = require('../functions/reply')

module.exports = {
  name: 'help',
  description: 'DMs a list of all commands.',
  execute (message, debugLog, debugFlag) {
    message.author.send([
      '.',
      '**Help**:',
      '__**Commands:**__',
      'Syntax: **<prefix> <command> <thing>**',
      '**`sk help`**: DMs this list to you',
      '**`sk new <thing>`**: Creates a new thing',
      '**`sk search <string>`**: DMs you a list of things with names that contain the string, `*` returns all',
      '**`sk best`**: Shows a list of the best five things by points',
      '**`sk worst`**: Shows a list of the worst five things by points',
      '**`sk <thing>`**: Shows a thing\'s points',
      '**`sk + <thing>`**: Increments a thing\'s points. If it doesn\'t exist, it is created',
      '**`sk - <thing>`**: Decrements a thing\'s points. If it doesn\'t exist, it is created',
      '**`sk delete <thing>`**: Deletes a thing. Only bad people do this.',
      'Notes:',
      '*- Prefix, commands, and thing names are case insensitive.*',
      '*- Thing names in parentheses can have spaces.*',
      '*- User Thing names with spaces must have a space between the `@` and the rest of the name.*',
      '*  - Example: `(@ Joe User)` for `@Joe User`*',
      '*- Add `debug` anywhere in any command to have debug info DM\'d to you.*',
      'Please report any bugs or issues [here on GitHub](https://github.com/LouisSavoie/simple-karma/issues).',
      'When reporting bugs in commands, please re-run the command with `debug` and include the DM you get in your bug report. Thanks!'
    ])

    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.author.send([
        '.',
        '__**ADMIN Commands:**__',
        'Syntax: **<prefix> <command> <thing> <value>**',
        '**`sk set <thing> <value>`**: Sets a thing\'s points to the value',
        '**`sk rename <thing> <value>`**: Renames a thing to the value',
        '**`sk admindelete <thing>`**: Deletes a thing',
        '**`sk undo`**: Undoes the last command that changed a thing',
        '**`sk namepoints <name>`**: Sets the name for points to the name.'
      ])
    }

    message.author.send([
      '.',
      '__**Links**__:',
      '**Invite SK to your server!**: <https://discord.com/api/oauth2/authorize?client_id=831293373913890856&permissions=0&scope=bot>',
      '**Support Discord Server**: <https://discord.gg/EyTxcAQbtC>: Try out SK, talk to other server Admins or myself!',
      '**Issues or suggestions**: <https://github.com/LouisSavoie/simple-karma/issues>: Please include either `Issue: ` or `Suggestion: ` in your title, thanks!',
      '**My Portfolio Website**: <https://www.louissavoie.com>',
      '**Donations welcome!**: <https://www.paypal.com/donate?business=2MV2PUZGP3XLC&no_recurring=1&item_name=SimpleKarma&currency_code=USD>'
    ])
    if (debugFlag) reply.sendDebug(message, debugLog)
  }
}
