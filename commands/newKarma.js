// Require Mongoose Model for Things
const Thing = require("../models/thing");

module.exports = {
    name: 'newKarma',
    description: "Creates a new thing",
    execute(message, thingName){
        // check if the database already has the thing
        Thing.findOne({name: thingName}, function(err, foundThing) {
            // if it does, send reply to the massage's channel explaining so
            if (foundThing){
                message.reply({
                    embed: {
                      color: "RED",
                      description: 'Thing, **' + foundThing.name + '**, already exists!'
                    }
                }).catch(console.error);
            // if it doesn't, create the thing then send reply to the message's channel confirming it's creation
            } else {
                Thing.create({name: thingName, karma: 0}, function(err, thing){
                    // if the creation fails, send reply to the message's channel explaining so
                    if(err){
                        message.reply({
                            embed: {
                              color: "RED",
                              description: 'A database **ERROR** ocurred and thing, **' + thingName + '**, was not created :('
                            }
                        }).catch(console.error);
                    } else {
                        message.reply({
                            embed: {
                              color: "BLUE",
                              description: `New thing, **${thing.name}**, has been created!`
                            }
                        }).catch(console.error);
                    }
                });
            }
        });
    }
}