const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
 {
  planId: {
   type: String,
   required: true,
   unique: true,
  },
  name: {
   type: String,
   required: true,
  },
  amount: {
   type: Number,
   required: true,
  },
  currency: {
   type: String,
   default: 'USD', // Can be customized
  },
  duration: {
   // Duration (e.g., 'month', 'year', or custom duration value)
   type: String,
   required: true,
  },
  durationValue: {
   // Optional: Custom duration value (e.g., for non-standard durations)
   type: Number,
  },
  features: {
   // Array of strings representing included features
   type: [String],
  },
  usageLimits: {
   // Object with usage limits (e.g., storage: 10GB)
   type: Object,
  },
 },
 { timestamps: true }
);

const Plan = mongoose.model('Plans', planSchema);
module.exports = Plan;
