const jsoning = require('jsoning'),
      karmaDB = new jsoning('./database/karma.json');

// DATABASE FUNCTIONS

let karma = {};

// Has
karma.has = async function(thing) {
    let res = await karmaDB.has(thing);
    return res;
};
// New
karma.new = async function(thing) {
    await karmaDB.set(thing, 0);
};
// Get
karma.get = async function(thing) {
    let res = await karmaDB.get(thing);
    return res;
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