const karma = require("../database/karmaDB");

module.exports = {
    name: 'decrementKarma',
    description: "Decrements karma for a thing",
    execute(message, thing){
        // check if the karma DB has the thing
        karma.has(thing).then(res => {
            // if it does, decrement it
            if (res) {
                karma.decrement(thing).then(res => {
                    // if increment was successful, get the thing's value and send it to the channel
                    if (res){
                        karma.get(thing).then(res => {
                            message.reply({
                                embed: {
                                  color: "BLUE",
                                  description: '**' + thing + '** has **' + res + '** karma.'
                                }
                            }).catch(console.error);
                        });
                    }
                });
            // else, tell the channel it doesn't exist and how to create it
            } else {
                message.reply({
                    embed: {
                      color: "RED",
                      description: `Karma thing, **${thing}**, doesn\'t exist!\n
                      You can create it with: \`sk newkarma ${thing}\`\n
                      Or it might exist under a different name.`
                    }
                }).catch(console.error);
            }
        });
    }
}