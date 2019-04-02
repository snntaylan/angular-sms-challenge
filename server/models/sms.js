const mongoose = require("mongoose");

const smsSchema = mongoose.Schema({
  city: {
    type: String
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  price: {
    type: Number
  },
  status: {
    type: String
  },
  color: {
    type: String
  }
});

module.exports = mongoose.model("sms", smsSchema);