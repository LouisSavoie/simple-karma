// Require Mongoose Model for Things
const Thing = require("../models/thing");

module.exports = {
    name: 'trollDelete',
    description: "Transfers karma from user issuing the command to the thing they tried to delete.",
    execute(message, thingName){
        // create regex for finding the command issuer
        const regex = new RegExp(message.member.displayName,"i");
        // check if the database has the the user that issued the command as a thing
        Thing.findOne({name: regex}, function(err, foundUser) {
            // if it does, continue
            if (foundUser) {
                // if user has non-positive karma throw error, else continue
                if (foundUser.karma <= 0) {
                    message.reply({
                        embed: {
                          color: "RED",
                          description: `You have insufficient karma to use this command.`
                        }
                    }).catch(console.error);
                } else {
                    // check if the database has the thing
                    Thing.findOne({name: thingName}, function(err, foundThing) {
                        // if it does, take the user's karma and give it to the thing
                        if (foundThing){
                            foundThing.karma += foundUser.karma;
                            foundThing.save();
                            foundUser.karma = 0;
                            foundUser.save();
                            // then send reply to the message's channel with the bad news, lol
                            message.reply({
                                embed: {
                                color: "BLUE",
                                description: `**AN *"ERROR"* OCCURRED!**\n
                                **${foundUser.name}'s** karma has been transferred to **${foundThing.name}**.\n
                                **${foundThing.name}** has **${foundThing.karma}** karma.\n
                                and **${foundUser.name.toUpperCase()}** has **NONE**.`
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
            // if it doesn't, send reply to the message's channel with error
            } else {
                message.reply({
                    embed: {
                      color: "RED",
                      description: `You must be in the database to use this command.\n
                      You can create yourself with: \`sk new @${message.member.displayName}\`.`
                    }
                }).catch(console.error);
            }
        });
    }
}