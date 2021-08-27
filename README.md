[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


# Simple Karma

SimpleKarma is a Discord bot used to award "things" points such as Karma. Things can be users, concepts, physical or digital objects, brands, or whatever you want!

Commands are formatted and limited in scope such that users interact with the points databases very deliberately.

## Commands
- Syntax: \<prefix\> \<command\> \<thing\>(optional)
- **`sk help`**: DMs this list to you
- **`sk new <thing>`**: Creates a new \<thing\>
- **`sk search <string>`**: DMs a list of \<thing\>s with names that include the given string. Searching `*` returns all.
- **`sk best`**: Shows a list of the best five things by karma.
- **`sk worst`**: Shows a list of the worst five things by karma.
- **`sk <thing>`**: Shows a \<thing\>'s karma
- **`sk + <thing>`**: Increments a \<thing\>'s karma
- **`sk - <thing>`**: Decrements a \<thing\>'s karma
- **`sk delete <thing>`**: Deletes a \<thing\>. Only bad people do this.

**Admin Commands**
- Syntax: \<prefix\> \<command\> \<thing\>(optional)
- **`sk adminset <thing> <value>`**: Sets a \<thing\>'s karma to the \<value\>
- **`sk adminrename <thing> <value>`**: Renames a \<thing\> to the \<value\>
- **`sk admindelete <thing>`**: Deletes a \<thing\>
- **`sk undo`**: Undoes the last command that changed a thing

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
- Increment / decrement a thing's karma
- You cant give yourself karma
- Show a thing's karma
- Search the database for things
- Searching `*` returns all
- List the best things
- list the worst things
- Get trolled trying to delete a thing
- Admin commands for users with the 'Administrator' permission
- Set karma values
- Rename things
- Actually delete things
- Users are added to the database when they join the server automatically
- Thing names in parentheses can have spaces. Example: `(SimpleKarma Discord Bot)` and `(@ SimpleKarma Bot)`
- Get debug info DM'd to you
- Undo changes

## Future Scope

- `+ / - karma` on a non-existent thing will create that thing
- allow command arguments in any order

~~*All caught up, hurrah!*~~

If you have any suggestions for Future Scope features or Current Scope feature improvements, please fill out an issue and start the title with `Suggestion: `. Thanks :D