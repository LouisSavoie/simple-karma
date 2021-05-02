# Simple Karma

SimpleKarma is a Discord bot used to award "things" points such as Karma. Things can be users, concepts, physical or digital objects, brands, or whatever you want!

Commands are formated and limited in scope such that users interact with the points databases very deliberately.

## Commands
- Syntax: \<prefix\> \<command\> \<thing\>(optional)
- **`sk help`**: DMs this list to you
- **`sk new <thing>`**: Creates a new \<thing\>
- **`sk search <strng>`**: DMs a list of \<thing\>s with names that include the given string.
- **`sk <thing>`**: Shows a \<thing\>'s karma
- **`sk + <thing>`**: Increments a \<thing\>'s karma
- **`sk - <thing>`**: Decrements a \<thing\>'s karma
- **`sk delete <thing>`**: Deletes a thing. Only bad people do this.

*Note: Prefix and commands are case insensitive.*

## Current Scope
- Help documentation
- Persistant cloud database
- Add new things to the database
- Increment / decrement a thing's karma
- Show a thing's karma
- Search the database for things
- Delete things. Don't do this...

## Future Scope
- You cant give yourself points. (If a thing is a user, it has a user id, which is checked against the message author's id)
- Admin commands for discord ranks to set points to specific values, add or subtract values, clear values or keys, etc.
- Lists for top 5, worst 5, etc.
- Allow things to have spaces in thier names.
- Additional points systems other than karma.
- Add a user as a thing to the database when they join the server.

If you have any suggestions for Future Scope features or Current Scope feature improvements, please fill out an issue and start the title with `Suggestion: `. Thanks :D