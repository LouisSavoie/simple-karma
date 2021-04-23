// Require Mongoose Model for Things
const Thing = require("../models/thing");

module.exports = {
    name: 'getThing',
    description: "Displays a thing",
    execute(message, thingName){
        // check if the database has the thing
        Thing.findOne({name: thingName}, function(err, foundThing) {
            // if it does, send reply to the message's channel with the thing
            if (foundThing){
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
                      description: `Thing, **${thingName}**, doesn\'t exist!\n
                      You can create it with: \`sk new ${thingName}\`\n
                      It could also exist under a different name.\n
                      Use \`sk search <part of name>\` to see if it does.`
                    }
                }).catch(console.error);
            }
        });
    }
}