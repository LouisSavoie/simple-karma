[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# <img src="simpleKarma.png" alt="" width="22"/>SimpleKarma

SimpleKarma is a Discord bot used to award things points. You can call the points anything, like Karma, Kudos, or just Points, and things can be users, concepts, physical or digital objects, brands, or whatever you want!

## Commands
- Syntax: \<prefix\> \<command\> \<thing\>(optional)
- **`sk help`**: DMs this list to you.
- **`sk new <thing>`**: Creates a new \<thing\>.
- **`sk search <string>`**: DMs a list of \<thing\>s with names that include the given string. Searching `*` returns all.
- **`sk best`**: Shows a list of the best five things by points.
- **`sk worst`**: Shows a list of the worst five things by points.
- **`sk <thing>`**: Shows a \<thing\>'s points.
- **`sk + <thing>`**: Increments a \<thing\>'s points. If it doesn't exist, it is created.
- **`sk - <thing>`**: Decrements a \<thing\>'s points. If it doesn't exist, it is created.

**Admin Commands**
- Syntax: \<prefix\> \<command\> \<thing\>(optional)
- **`sk hire <@user>`**: Sets the mentioned user as an admin for SK.
- **`sk fire <@user>`**: Removes the mentioned user as an admin for SK.
- **`sk set <thing> <value>`**: Sets a \<thing\>'s points to the \<value\>.
- **`sk add <thing> <value>`**: Adds the \<value\> to a \<thing\>'s points.
- **`sk subtract <thing> <value>`**: Subtracts the \<value\> from a \<thing\>'s points.
- **`sk rename <thing> <value>`**: Renames a \<thing\> to the \<value\>.
- **`sk delete <thing>`**: Deletes a \<thing\>. `*` deletes all things.
- **`sk undo`**: Undoes the last command that changed a thing.
- **`sk namepoints <name>`**: Sets the name for points to \<name\>.

**Notes:**
- *Prefix, commands, and thing names are case insensitive.*
- *Thing names in parentheses can have spaces.*
- *User Thing names with spaces must have a space between the `@` and the rest of the name.*
  - *Example: `(@ Joe User)` for `@Joe User`*
- *Add `debug` anywhere in any command to have debug info DM'd to you.*

## Current Scope
- Create things
- Show things
- Show top 5 things
- Show bottom 5 things
- Search for things by partial name
- Increment a thing's points
- Decrement a thing's points
- Set a thing's points
- Rename a thing
- Delete a thing
- Undo commands
- Customize points name
- Auto-add user as thing on join
- Admin only commands
- Help documentation
- Persistent cloud database
- Debug info
- Support server
- Donations ;)

## Future Scope

### Admin Update:
1. Add users as botAdmin so they can use admin commands without being a Discord admin
2. Add <value> and subtract <value> admin commands
3. Delete all things admin command
4. Add all users admin command
5. Multi-new admin command
6. Toggle allowing negative points admin command
7. Toggle allowing trolldelete admin command

### Points Update:
1. Points names can be prefix or suffix
2. Singular and plural points names

...and other non-feature codebase updates. Ya'know, dev stuff.

~~*All caught up, hurrah!*~~

## Links

- [Invite SK to your server!](https://discord.com/api/oauth2/authorize?client_id=831293373913890856&permissions=0&scope=bot)
- [Support Discord Server](https://discord.gg/EyTxcAQbtC): Try out SK, talk to other server Admins or myself!
- [Issues or suggestions](https://github.com/LouisSavoie/simple-karma/issues): Please include either `Issue: ` or `Suggestion: ` in your title, thanks!
- [My Portfolio Website](www.louissavoie.com)
- [Donations welcome!](https://www.paypal.com/donate?business=2MV2PUZGP3XLC&no_recurring=1&item_name=SimpleKarma&currency_code=USD)

  ![Donations QR Code](./paypalQRCode.png)
