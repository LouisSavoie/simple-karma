const mongoose = require('mongoose')

// THING MONGOOSE MODEL
const ThingSchema = new mongoose.Schema({
  server: String,
  name: String,
  nameLower: String,
  points: Number
})

module.exports = mongoose.model('Thing', ThingSchema)
