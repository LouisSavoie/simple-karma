const mongoose = require('mongoose')

// SERVER MONGOOSE MODEL
const ServerSchema = new mongoose.Schema({
  ID: String,
  pointsName: String
})

module.exports = mongoose.model('Server', ServerSchema)
