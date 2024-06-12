const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema(
 {
  store_id: {
   type: String,
   required: true,
  },
  code: {
   type: String,
   required: true,
  },
  value: {
   type: Number,
   required: true,
  },
  type: {
   type: String,
   enum: ['P', 'F'], // 'P' for percentage, 'F' for fixed amount
   required: true,
  },
  active: {
   type: Boolean,
   default: true,
  },
  endDate: {
   type: Date,
   required: true,
  },
  startDate: {
   type: Date,
   required: true,
  },
 },
 {
  timestamps: true,
 }
);

const Coupon = mongoose.model('Coupon', couponSchema);
//Coupon.index({ fieldName: 1 }); //
module.exports = Coupon;
