// Require functions
const db = require("../functions/database");
const reply = require("../functions/reply");

module.exports = {
    name: 'decrementKarma',
    description: "Decrements karma for a thing",
    async execute(message, thingName){
        // check if the database has the thing
        let foundThing = await db.findOne(thingName);

        // debug
        console.log("DEBUG: 2. decrementKarma.js, foundThing: " + foundThing);

        // if it does, decrement thing's karma then send reply to the message's channel with thing's karma
        if (foundThing){
            foundThing.karma -= 1;
            foundThing.save();
            reply.found(message, foundThing);
        // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
        } else {
            reply.notFound(message, thingName);
        }
    }
}