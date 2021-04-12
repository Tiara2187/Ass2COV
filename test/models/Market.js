const mongoose = require("mongoose");

const schema = mongoose.Schema({
    marketname: String,
    lastcollect: Date

});
module.exports = mongoose.model("Market", schema);
