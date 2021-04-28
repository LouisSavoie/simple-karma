// Require Mongoose Model for Things
const Thing = require("../models/thing");

// Create find object
let findObj = {};

// FIND ONE
findObj.findOne = async function(message, thingName) {
    // check if the database has the thing
    let foundThing = await Thing.findOne({name: thingName}).exec();

    // debug
    console.log("============= findOne in Database ===============");
    console.log("DEBUG: 1. findThing.js, foundThing: " + foundThing);

    // if it does, return the thing
    if (foundThing) {
        return foundThing;
    // if it doesn't, send reply to message's channel with error and instructions for how to create the thing
    } else {
        return null;
    }
};

//  Export find object
module.exports = findObj;