# Simple Karma

SimpleKarma is a Discord bot used to award "things" points such as Karma. Things can be users, concepts, physical or digital objects, brands, or whatever you want!

Commands are formated and limited in scope such that users interact with the points databases very deliberately.

## Commands
- Syntax: \<prefix\> \<command\> \<thing\>(optional)
- **`sk help`**: DMs this list to you
- **`sk new <thing>`**: Creates a new \<thing\>
- **`sk search <strng>`**: DMs a list of \<thing\>s with names that include the given string.
- **`sk best`**: Shows a list of the top five \<thing\>s by karma.
- **`sk worst`**: Shows a list of the worst five \<thing\>s by karma.
- **`sk <thing>`**: Shows a \<thing\>'s karma
- **`sk + <thing>`**: Increments a \<thing\>'s karma
- **`sk - <thing>`**: Decrements a \<thing\>'s karma
- **`sk delete <thing>`**: Deletes a thing. Only bad people do this.

**Admin Commands**
- Syntax: \<prefix\> \<command\> \<thing\>(optional)
- **`sk adminset <thing> <value>`**: Sets a \<thing\>'s karma to the value
- **`sk admindelete <thing>`**: Deletes a \<thing\>

*Note: Prefix and commands are case insensitive.*

## Current Scope
- Help documentation
- Persistant cloud database
- Add new things to the database
- Increment / decrement a thing's karma
- You cant give yourself karma.
- Show a thing's karma
- Search the database for things
- Delete things. Don't do this...
- Admin commands for users with the 'Administrator' permission

## Future Scope
- Lists for top 5, worst 5, etc.
- Add a user as a thing to the database when they join the server.

If you have any suggestions for Future Scope features or Current Scope feature improvements, please fill out an issue and start the title with `Suggestion: `. Thanks :D