const jsoning = require('jsoning'),
      karmaDB = new jsoning('./database/karma.json');

// DATABASE FUNCTIONS

let karma = {};

// New
karma.new = async function(thing) {
    await karmaDB.set(thing, 0);
};
// Get
karma.get = async function(thing) {
    await karmaDB.get(thing);
};
// Increment
karma.increment = async function(thing) {
    await karmaDB.math(thing, "add", 1);
};
// Decrement
karma.decrement = async function(thing) {
    await karmaDB.math(thing, "subtract", 1);
};

module.exports = karma;