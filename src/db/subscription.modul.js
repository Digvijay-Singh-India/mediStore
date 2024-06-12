const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
 {
  store_id: { type: String, required: true },
  order_id: { type: String, required: true },
  order_date: { type: Date, required: true },
  plan: {
   type: String,
   enum: ['Free', 'Stater', 'Premium', 'Custom'],
   required: true,
  },
  duration: {
   type: String,
   required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  msg: String,
  amount: {
   price: String,
   tax: String,
   discount: String,
   coupon: Object,
   total: String,
   payment_id: String,
  },

  // Other relevant fields (e.g., payment details)
 },
 { timestamps: true }
);

const Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports = Subscription;
