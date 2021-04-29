// Require functions
const db = require("../functions/database");
const reply = require("../functions/reply");

module.exports = {
    name: 'getThing',
    description: "Displays a thing",
    async execute(message, thingName) {
        // check if the database has the thing
        let foundThing = await db.findOne(thingName);
        
        // debug
        console.log("DEBUG: 2. getThing.js, thing: " + foundThing);

        // if it does, reply with the thing
        if (foundThing) {
            reply.found(message, foundThing);
        // if not, reply with error
        } else {
            reply.notFound(message, thingName);
        }
    }
}