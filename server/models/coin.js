const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  country: { type: String, required: true },
  condition: { type: String, enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'], required: true },
  value: { type: Number, required: false },
  description: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Coin', coinSchema);
