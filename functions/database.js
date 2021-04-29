// Require Mongoose Model for Things
const Thing = require("../models/thing");

// Create find object
let databaseObj = {};

// FIND ONE
databaseObj.findOne = async function(thingName) {
    let regex = new RegExp(thingName,"i");
    // check if the database has the thing
    let foundThing = await Thing.findOne({name: regex}).exec();

    // debug
    console.log("============= findOne in Database ===============");
    console.log("DEBUG: 1. database.js, foundThing: " + foundThing);

    // if it does, return the thing
    if (foundThing) {
        return foundThing;
    // if it doesn't, return null
    } else {
        return null;
    }
};

// FIND
databaseObj.find = async function(char) {
    let regex = new RegExp(char,"i");
    // Search the database for things with names containing with the character
    let foundThings = await Thing.find({name: regex});

    // debug
    console.log("============= find in Database ===============");
    console.log("DEBUG: 1. database.js, foundThings: " + foundThings);

    // if success, return the things
    if (foundThings) {
        return foundThings;
    // if not, return null
    } else {
        return null;
    }
};

// CREATE THING
databaseObj.create = async function(thingName) {
    let newThing = await Thing.create({name: thingName, karma: 0});

    // if it creation is successful, return the thing
    if (newThing) {
        return newThing;
    // if the creation fails, return null
    } else {
        return null;
    }
};

//  Export find object
module.exports = databaseObj;