const karma = require("../database/karmaDB");

module.exports = {
    name: 'incrementKarma',
    description: "Increments karma for a thing",
    execute(message, thing){
        // check if the karma DB has the thing
        karma.has(thing).then(res => {
            // if it does, increment it
            if (res) {
                karma.increment(thing).then(res => {
                    // if increment was successful, get the thing's value and send it to the channel
                    if (res){
                        karma.get(thing).then(res => {
                            message.channel.send([
                                '**' + thing + '** has **' + res + '** karma.'
                            ]).catch(console.error);
                        });
                    }
                });
            // else, tell the channel it doesn't exist and how to create it
            } else {
                message.channel.send([
                    'Karma thing, **' + thing + '**, doesn\'t exist!',
                    'You can create it with: `sk newkarma ' + thing + '`',
                    'Or it might exist under a different name.'
                ]).catch(console.error);
            }
        });
    }
}