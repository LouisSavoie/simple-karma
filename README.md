# Simple Karma

SimpleKarma is a Discord bot used to award "things" points such as Karma. Things can be users, concepts, physical or digital objects, brands, or whatever you want!

Commands are formated and limited in scope such that users interact with the points databases very deliberately.

## Commands
- Syntax: \<prefix\> \<command\> \<thing\>(optional)
- **`sk help`**: DMs this list to you
- **`sk newkarma <thing>`**: Creates a new \<thing\>
- **`sk karma <thing>`**: Shows a \<thing\>'s karma
- **`sk +karma <thing>`**: Increments a \<thing\>'s karma
- **`sk -karma <thing>`**: Decrements a \<thing\>'s karma

## Current Scope
- Seperate thing creation command to prevent variations of a thing being added to database while incrementing (etc.) the thing's points if it's not specificed exactly as it is currently in the database.
- Karma specfic commands allowing for future additional points systems.
- Things stored as plain strings allowing for users and ideas to be used.

## Future Scope
- You cant give yourself points.
- List all things in a database for users to discover what things are available, through a DM to prevent channel spam.
- Admin commands using password (set in config) to set points to specific values, add or subtract values, clear values or keys, etc.
- Lists for top 5, worst 5, etc.
- Allow things to have spaces.
- Additional points systems other than karma.

If you have any suggestions for Future Scope features or Current Scope feature improvements, please fill out an issue and start the title with `Suggestion: `. Thanks :D