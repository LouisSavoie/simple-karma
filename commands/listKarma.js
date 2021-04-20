// Require Mongoose Model for Things
const Thing = require("../models/thing");

module.exports = {
    name: 'listKarma',
    description: "DMs karma for things starting with a character",
    execute(message, char){
        // check if the database has things with names containing with the character
        let regex = new RegExp(char,"i");
        Thing.find({name: regex}, function(err, foundThings) {
            // if it doesn't, send DM to message's author with error
            if (foundThings.length == 0){
                message.reply({
                    embed: {
                      color: "RED",
                      description: `No things starting with **${char}** exist!`
                    }
                }).catch(console.error);
            // if it does, send DM to the message's author with thing's karma
            } else {
                console.log("foundThings:\n" + foundThings);
                text = `.\nThings containing **${char}**:`;
                foundThings.forEach(thing => {
                   text += `\n--------------------\n**${thing.name}**: Karma - **${thing.karma}**`
                });
                console.log("text:\n" + text);
                message.author.send([
                    `${text}`
                ]).catch(console.error);
            }
        });
    }
}