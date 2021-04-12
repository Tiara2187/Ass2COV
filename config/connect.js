const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  
  const db = mongoose.connection;
  db.on("error", console.error.bind("connection error"));
  db.once("open", () => {
    console.log("connection Ok");
  });
};


