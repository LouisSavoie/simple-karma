const karma = require("../database/karmaDB");

module.exports = {
    name: 'incrementKarma',
    description: "Increments karma for a thing",
    execute(message, thing){
        karma.has(thing).then(res => {
            //PrintDebug
            // console.log("karma thing exists: " + res);
            if (res) {
                karma.increment(thing).then(res => {
                    if (res){
                        karma.get(thing).then(res => {
                            message.channel.send([
                                '**' + thing + '** has **' + res + '** karma.'
                            ]).catch(console.error);
                        });
                    }
                });
                
            } else {
                message.channel.send([
                    'Karma thing, **' + thing + '**, doesn\'t exist!',
                    'You can create it with: `sk newkarma ' + thing + '`',
                    'Or it might exist under a different name.'
                ]).catch(console.error);
            }
        });
    }
}