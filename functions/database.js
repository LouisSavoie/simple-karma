// Require Mongoose Model for Things
const Thing = require('../models/thing')

// Create find object
const databaseObj = {}

// FIND ONE
databaseObj.findOne = async function (server, thingName) {
  // check if the database has the thing
  const foundThing = await Thing.findOne({ server: server, nameLower: thingName.toLowerCase() }).exec()

  // debug
  const debugDB = `
  === findOne in Database ===
  DEBUG: 1. database.js, foundThing: ${foundThing}`
  console.log(debugDB)

  // if it does, return the thing
  if (foundThing) {
    return [foundThing, debugDB]
    // if it doesn't, return null
  } else {
    return [null, debugDB]
  }
}

// FIND
databaseObj.find = async function (server, char) {
  const regex = new RegExp(char, 'i')
  // Search the database for things with names containing with the character
  const foundThings = await Thing.find({ server: server, name: regex })

  // debug
  const debugDB = `
  === find in Database ===
  DEBUG: 1. database.js, foundThings: ${foundThings}`
  console.log(debugDB)

  // if success, return the things
  if (foundThings) {
    return [foundThings, debugDB]
    // if not, return null
  } else {
    return [null, debugDB]
  }
}

// FIND BEST
databaseObj.findBest = async function (server) {
  // Search the database for best five karma
  const foundThings = await Thing.find({ server: server }).sort({ karma: -1 }).limit(5)

  // debug
  const debugDB = `
  === find best five in Database ===
  DEBUG: 1. database.js, foundThings: ${foundThings}`
  console.log(debugDB)

  // if success, return the things
  if (foundThings) {
    return [foundThings, debugDB]
    // if not, return null
  } else {
    return [null, debugDB]
  }
}

// FIND WORST
databaseObj.findWorst = async function (server) {
  // Search the database for worst five karma
  const foundThings = await Thing.find({ server: server }).sort({ karma: 1 }).limit(5)

  // debug
  console.log('=== find worst five in Database ===')
  console.log('DEBUG: 1. database.js, foundThings: ' + foundThings)

  // if success, return the things
  if (foundThings) {
    return foundThings
    // if not, return null
  } else {
    return null
  }
}

// CREATE THING
databaseObj.create = async function (server, thingName) {
  const newThing = await Thing.create({ server: server, name: thingName, nameLower: thingName.toLowerCase(), karma: 0 })

  // if it creation is successful, return the thing
  if (newThing) {
    return newThing
    // if the creation fails, return null
  } else {
    return null
  }
}

// DELETE THING
databaseObj.deleteOne = async function (server, thingName) {
  const res = await Thing.deleteOne({ server: server, name: thingName })

  // debug
  console.log('=== deleteOne from Database ===')
  console.log('DEBUG: 1. database.js, res: ' + res.ok)

  return res.ok
}

//  Export find object
module.exports = databaseObj
