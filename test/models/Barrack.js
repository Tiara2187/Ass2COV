const mongoose = require("mongoose");

const schema = mongoose.Schema({
    barrackname: String,
    lastcollect: Date

});
module.exports = mongoose.model("Barrack", schema);