// Require functions
const db = require("../functions/findThing");
const reply = require("../functions/reply");

module.exports = {
    name: 'incrementKarma',
    description: "Increments karma for a thing",
    async execute(message, thingName){
        // check if the command issuer is the thing being incremented
        if (!thingName.includes(message.member.displayName)) {
            // check if the database has the thing
            let foundThing = await db.findOne(message, thingName);

            // debug
            console.log("DEBUG: 2. incrementKarma.js, foundThing: " + foundThing);

            // if it does, check if the thing's karma is over 9000
            if (foundThing) {
                // if it is, send reply to message's channel with error
                if (foundThing.karma >= 9001) {
                    reply.capped(message, thingName);
                // if it isn't, increment thing's karma then send reply to the message's channel with thing's karma
                } else {
                    foundThing.karma += 1;
                    foundThing.save();
                    reply.found(message, foundThing);
                }
            // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
            } else {
                reply.notFound(message, thingName);
            }
        } else {
            reply.karmaYourselfError(message, thingName);
        }
    }
}