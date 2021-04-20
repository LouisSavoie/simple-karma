module.exports = {
    name: 'help',
    description: "DMs a list of all commands.",
    execute(message){
        message.author.send([
            '.',
            '**Help**:',
            '__**Commands:**__',
            'Syntax: **<prefix> <command> <thing>(optional)**',
            '**`sk help`**: DMs this list to you',
            '**`sk newkarma <thing>`**: Creates a new <thing>',
            '**`sk karma <thing>`**: Shows a <thing>\'s karma',
            '**`sk +karma <thing>`**: Increments a <thing>\'s karma',
            '**`sk -karma <thing>`**: Decrements a <thing>\'s karma'
        ]);
    }
}