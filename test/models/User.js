const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: String,
    email: String,
    password:String,
    resources: {
        golds: Number,
        foods: Number,
        soliders: Number,
      },
        medal: Number,
        townhall: String,

});

module.exports = mongoose.model("User", schema);
