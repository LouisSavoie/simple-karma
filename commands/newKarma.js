const karma = require("../database/karmaDB");

module.exports = {
    name: 'newKarma',
    description: "Creates a new thing",
    execute(message, thing){
        // check if the karma DB already has the thing
        karma.has(thing).then(res => {
            // if it doesn't, create it and send confirmation to channel
            if (!res) {
                karma.new(thing).then(res => {
                    if (res) {
                        message.reply({
                            embed: {
                              color: "BLUE",
                              description: `New Karma thing, **${thing}**, has been created!`
                            }
                        }).catch(console.error);
                    }
                });
            // else, tell the channel it already exists
            } else {
                message.reply({
                    embed: {
                      color: "RED",
                      description: 'Karma thing, **' + thing + '**, already exists!'
                    }
                }).catch(console.error);
            }
        });
    }
}