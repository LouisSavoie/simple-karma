const mongoose = require("mongoose");

// THING MONGOOSE MODEL
const ThingSchema = new mongoose.Schema({
    name: String,
    karma: Number
});

module.exports = mongoose.model("Thing", ThingSchema);