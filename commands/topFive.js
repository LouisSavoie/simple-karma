// Require functions
const db = require("../functions/database");
const reply = require("../functions/reply");

module.exports = {
    name: 'topFive',
    description: "Displays the top 5 things with the highest karma",
    async execute(message) {
        // get the things from the database
        let foundThings = await db.findTopFive();
        
        // debug
        console.log("DEBUG: 2. topFIve.js, things: " + foundThings);

        // if things are found, reply with the things
        if (foundThings) {
            reply.topFiveFound(message, foundThings);
        // if not, reply with error
        } else {
            reply.topFiveNotFound(message);
        }
    }
}