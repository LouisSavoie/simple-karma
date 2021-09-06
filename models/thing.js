const mongoose = require('mongoose')

// THING MONGOOSE MODEL
const ThingSchema = new mongoose.Schema({
  server: String,
  name: String,
  nameLower: String,
  karma: Number
})

module.exports = mongoose.model('Thing', ThingSchema)
