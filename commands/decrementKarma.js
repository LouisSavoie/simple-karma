// Require Mongoose Model for Things
const Thing = require("../models/thing");

module.exports = {
    name: 'decrementKarma',
    description: "Decrements karma for a thing",
    execute(message, thingName){
        // check if the database has the thing
        Thing.findOne({name: thingName}, function(err, foundThing) {
            // if it does, decrement thing's karma then send reply to the message's channel with thing's karma
            if (foundThing){
                foundThing.karma -= 1;
                foundThing.save();
                message.reply({
                    embed: {
                      color: "BLUE",
                      description: '**' + foundThing.name + '** has **' + foundThing.karma + '** karma.'
                    }
                }).catch(console.error);
            // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
            } else {
                message.reply({
                    embed: {
                      color: "RED",
                      description: `Karma thing, **${thingName}**, doesn\'t exist!\n
                      You can create it with: \`sk newkarma ${thingName}\`\n
                      Or it might exist under a different name.`
                    }
                }).catch(console.error);
            }
        });
    }
}