const karma = require("./karmaDB");

module.exports = {
    name: 'new',
    description: "Creates a new thing",
    execute(message, thing){
        karma.new(thing);
        message.channel.send([
            '**' + thing + '** has been created!'
        ]).catch(console.error);
    }
}