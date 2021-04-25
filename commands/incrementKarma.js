// Require Mongoose Model for Things
const Thing = require("../models/thing");

module.exports = {
    name: 'incrementKarma',
    description: "Increments karma for a thing",
    execute(message, thingName){
        // check if the command issuer is the thing being incremented
        if (!thingName.includes(message.member.displayName)) {
            // check if the database has the thing
            Thing.findOne({name: thingName}, function(err, foundThing) {
                // if it does, increment thing's karma then send reply to the message's channel with thing's karma
                if (foundThing){
                    foundThing.karma += 1;
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
                        description: `Thing, **${thingName}**, doesn\'t exist!\n
                        You can create it with: \`sk new ${thingName}\`\n
                        It could also exist under a different name.\n
                        Use \`sk search <part of name>\` to see if it does.`
                        }
                    }).catch(console.error);
                }
            });
        } else {
            message.reply({
                embed: {
                  color: "RED",
                  description: `You cannot give karma to yourself.`
                }
            }).catch(console.error);
        }
    }
}