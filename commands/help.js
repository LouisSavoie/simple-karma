module.exports = {
    name: 'help',
    description: "DMs a list of all commands.",
    execute(message){
        message.author.send([
            '.',
            '**Help**:',
            '__**Commands:**__',
            'Syntax: **<prefix> <command> <thing>**',
            '**`sk help`**: DMs this list to you',
            '**`sk new <thing>`**: Creates a new thing',
            '**`sk search <string>`**: DMs you a list of things with names that contain the string',
            '**`sk <thing>`**: Shows a thing\'s karma',
            '**`sk +karma <thing>`**: Increments a thing\'s karma',
            '**`sk -karma <thing>`**: Decrements a thing\'s karma'
        ]);
    }
}