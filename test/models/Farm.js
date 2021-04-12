const mongoose = require("mongoose");

const schema = mongoose.Schema({
    farmname: String,
    lastcollect: Date

});
module.exports = mongoose.model("Farm", schema);
