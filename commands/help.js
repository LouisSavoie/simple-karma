module.exports = {
    name: 'help',
    description: "DMs a list of all commands.",
    execute(msg){
        msg.author.send([
            '**Help**:',
            'Here is a list of commands I respond to:',
            '**`sk help`**: DMs this list to you',
            '**`sk <thing>`**: shows <things>\'s karma',
            '**`sk + <thing>`**: increments <things>\s karma',
            '**`sk - <thing>`**: decrements <things>\s karma'
        ]);
    }
}