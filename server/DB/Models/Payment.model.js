const mongoose = require('mongoose');

const Payment = new mongoose.Schema(
  {
    CardNumber: String,
    Month: String,
    ExpDate: String,
    Year: String,
    CVV: String,
    Amount: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', Payment);
