const karma = require("../database/karmaDB");

module.exports = {
    name: 'newKarma',
    description: "Creates a new thing",
    execute(message, thing){
        karma.new(thing);
        message.channel.send([
            '**' + thing + '** has been created!'
        ]).catch(console.error);
    }
}