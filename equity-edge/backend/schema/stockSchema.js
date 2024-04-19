const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  stockTicker: {
    type: String,
    required: true,
    unique: true,
  },
  sharesPurchased: {
    type: Number,
    required: true,
  },
  initialPrice: {
    type: Number,
    required: true,
  },
});

module.exports = stockSchema;
