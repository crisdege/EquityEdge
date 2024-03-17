const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://crisd:12345@equityedgedb.xmydyfo.mongodb.net/";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// export
module.exports = db;
