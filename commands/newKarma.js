const karma = require("../database/karmaDB");

module.exports = {
    name: 'newKarma',
    description: "Creates a new thing",
    execute(message, thing){
        karma.has(thing).then(res => {
            //PrintDebug
            // console.log("karma thing exists: " + res);
            if (!res) {
                karma.new(thing);
                message.channel.send([
                    'New Karma thing, **' + thing + '**, has been created!'
                ]).catch(console.error);
            } else {
                message.channel.send([
                    'Karma thing, **' + thing + '**, already exists!'
                ]).catch(console.error);
            }
        });
    }
}