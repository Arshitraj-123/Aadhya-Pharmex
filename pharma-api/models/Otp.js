const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  forLogin: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  // This automatically deletes the document after 120 seconds (2 minutes)
  createdAt: { type: Date, default: Date.now, expires: 120 }
});

module.exports = mongoose.model('Otp', otpSchema);
