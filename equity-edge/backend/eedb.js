const mongoose = require("mongoose");
const userSchema = require("./schema/userSchema.js");
const stockSchema = require("./schema/stockSchema.js");

const mongoURI = "mongodb+srv://crisd:12345@equityedgedb.xmydyfo.mongodb.net/";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const User = mongoose.model("User", userSchema);
const Stock = mongoose.model("Stock", stockSchema);

module.exports = {
  db,
  User,
  Stock,
};
