[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


# Simple Karma

SimpleKarma is a Discord bot used to award "things" points. Things can be users, concepts, physical or digital objects, brands, or whatever you want!

Commands are formatted and limited in scope such that users interact with the points databases very deliberately.

## Commands
- Syntax: \<prefix\> \<command\> \<thing\>(optional)
- **`sk help`**: DMs this list to you.
- **`sk new <thing>`**: Creates a new \<thing\>.
- **`sk search <string>`**: DMs a list of \<thing\>s with names that include the given string. Searching `*` returns all.
- **`sk best`**: Shows a list of the best five things by points.
- **`sk worst`**: Shows a list of the worst five things by points.
- **`sk <thing>`**: Shows a \<thing\>'s points.
- **`sk + <thing>`**: Increments a \<thing\>'s points, if it doesn't exist it is created.
- **`sk - <thing>`**: Decrements a \<thing\>'s points, if it doesn't exist it is created.
- **`sk delete <thing>`**: Deletes a \<thing\>. Only bad people do this.

**Admin Commands**
- Syntax: \<prefix\> \<command\> \<thing\>(optional)
- **`sk set <thing> <value>`**: Sets a \<thing\>'s points to the \<value\>.
- **`sk rename <thing> <value>`**: Renames a \<thing\> to the \<value\>.
- **`sk admindelete <thing>`**: Deletes a \<thing\>.
- **`sk undo`**: Undoes the last command that changed a thing.
- **`sk namepoints <name>`**: Sets the name for points to \<name\>.

**Notes:**
- *Prefix, commands, and thing names are case insensitive.*
- *Thing names in parentheses can have spaces.*
- *User Thing names with spaces must have a space between the @ and the rest of the name.*
  - *Example: `(@ Joe User)` for `@Joe User`*
- *Add `debug` anywhere in the command to have debug info DM'd to them.*

## Current Scope
- Help documentation
- Persistent cloud database
- Add new things to the database
- Things are specific to a Discord server
- Increment / decrement a thing's points
- You cant give yourself points
- Show a thing's points
- Search the database for things
- Searching `*` returns all
- List the best things
- list the worst things
- Get trolled trying to delete a thing
- Admin commands for users with the 'Administrator' permission
- Set points values
- Rename things
- Actually delete things
- Users are added to the database when they join the server automatically
- Thing names in parentheses can have spaces. Example: `(SimpleKarma Discord Bot)` and `(@ SimpleKarma Bot)`
- Get debug info DM'd to you
- Undo changes
- Rename the points for your server

## Future Scope

- adminPlus and adminMinus commands
- add users as botAdmin so they can use admin commands without being a discord admin
- delete all for server admin command
- add all users of server command
- multi-newThing command
- singular and plural points
- support server
- allow command arguments in any order
- toggle allowing negative points

~~*All caught up, hurrah!*~~

If you have any suggestions for Future Scope features or Current Scope feature improvements, please fill out an issue and start the title with `Suggestion: `. Thanks :D