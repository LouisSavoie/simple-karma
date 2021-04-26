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
                // if it does, check if the thing's karma is over 9000
                if (foundThing){
                    // if it is, send reply to message's channel with error
                    if (foundThing.karma >= 9001) {
                        message.reply({
                            embed: {
                            color: "RED",
                            description: `Thing, **${foundThing.name}'s** karma is already **OVER 9000**!\n
                            **${foundThing.name}** doesn't need anymore.`
                            }
                        }).catch(console.error);
                    // if it isn't, increment thing's karma then send reply to the message's channel with thing's karma
                    } else {
                        foundThing.karma += 1;
                        foundThing.save();
                        message.reply({
                            embed: {
                            color: "BLUE",
                            description: '**' + foundThing.name + '** has **' + foundThing.karma + '** karma.'
                            }
                        }).catch(console.error);
                    }
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