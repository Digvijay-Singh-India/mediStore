const mongoose = require('mongoose');

const storePaymentSchema = new mongoose.Schema(
 {
  store_id: {
   type: String,
   required: true,
  },
  user_id: {
   type: String,
   required: true,
  },
  order_id: {
   type: String,
   required: true,
  },
  transaction_id: {
   type: String,
   default: '',
   unique: true,
  },
  amount: {
   type: Number,
   required: true,
  },
  method: {
   type: String,
   enum: ['credit_card', 'paypal', 'bank_transfer', 'UPI', 'other'],
   required: true,
  },
  status: {
   type: String,
   enum: ['pending', 'completed', 'failed'],
   default: 'pending',
  },
  note: {
   type: Object,
   default: '',
  },
  date: {
   type: Date,
   required: true,
  },
 },
 { timestamps: true }
);

const StorePayment = mongoose.model('storepayments', storePaymentSchema);
module.exports = StorePayment;
