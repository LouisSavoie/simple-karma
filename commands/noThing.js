// Require functions
const reply = require("../functions/reply");

module.exports = {
    name: 'noThing',
    description: "Replies that command does not include a thing",
    execute(message){
        reply.noThing(message);
    }
}