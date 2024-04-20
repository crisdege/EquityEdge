const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  portfolio: {
    cash: {
      type: Number,
      default: 0, // Default cash balance to 0
      validate: {
        validator: function (v) {
          return v >= 0; // Ensure cash is non-negative
        },
        message: (props) => `${props.value} is not a valid cash amount!`,
      },
    },
    totalSharesPurchased: {
      type: Number,
      default: 0,
    },
    stocks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StockPurchase", // Reference to the StockPurchase model
      },
    ],
  },
});

module.exports = userSchema;
