const mongoose = require('mongoose')

// ADMIN MONGOOSE MODEL
const AdminSchema = new mongoose.Schema({
  serverID: String,
  memberID: String
})

module.exports = mongoose.model('Admin', AdminSchema)