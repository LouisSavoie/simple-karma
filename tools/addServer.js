const mongoose = require('mongoose')
const Thing = require('../models/thing')

require('dotenv').config()

// CONNECT MONGOOSE TO MONGODB
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log('Mongoose connected to MongoDB'))
  .catch(error => console.log(error.message))
mongoose.set('useFindAndModify', false)

// ADD nameLower TO ALL DATABASE OBJECTS
Thing.find({}, function (err, res) {
  if (err) {
    console.log(err)
  }
  res.forEach(thing => {
    thing.server = '' // insert server id
    thing.save()
    console.log(thing)
  })
  console.log('Successed!')
})
