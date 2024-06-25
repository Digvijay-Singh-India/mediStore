const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const amountSchema = {
 subtotal: {
  type: String,
  required: true,
 },
 discount: {
  type: String,
  default: '0.00',
 },
 deliveryCharge: {
  type: String,
  default: '0.00',
 },
 total: {
  type: String,
  required: true,
 },
};
// amountSchema.pre('save'),
// 	function (next) {
// 		// function calculateValue(age, weight) {
// 		// 	value = Age * Weight;
// 		next();
// 	};
const amountPaidSchema = {
 method: {
  type: String,
  enum: ['UPI', 'COD','Net Banking'],
  required: true,
  //default: 'COD',
 },
 status: {
  type: String,
  enum: [
   'Unpaid',
   'Paid',
   'Pending',
   'Approved',
   'Waiting For Approval',
   'Rejected',
  ],
  default: 'Unpaid',
 },
 img: {
  type: String,
  default: '',
 },
 notes: { type: String, default: '' },
 date: {
  type: String,
  default: '',
 },
 amount: {
  type: Number,
  default: null,
 },
 pg: {
  type: String,
  default: '',
 },
};
const addressSchema = {
 name: {
  type: String,
  required: true,
 },
 mobile: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  required: true,
 },
 street: {
  type: String,
  default: '',
  // required: true,
 },
 city: {
  type: String,
  default: '',
  //required: true,
 },
 dist: {
  type: String,
  required: true,
 },
 state: {
  type: String,
  required: true,
 },
 postalCode: {
  type: String,
  required: true,
 },
 country: {
  type: String,
  required: true,
 },
};

const orderCancelSchema = {
 reason: {
  type: String,
  default: '',
 },
 cancelledBy: {
  type: String,
  default: '',
 },
 cancelledAt: {
  type: Date,
  default: '',
 },
};

const orderSchema = new Schema(
 {
  store_id: {
   type: String,
   required: true,
  },
  order_id: {
   type: String,
   required: true,
   unique: true,
   //default: id('order'),
  },
  user_id: {
   type: String,
   required: true,
  },

  items: {
   type: Array,
   required: true,
  },
  order_date: {
   type: Date,
   required: true,
  },
  coupon: {
   code: {
    type: String,
    default: '',
   },
   value: {
    type: Number,
    default: 0,
   },
   type: {
    type: String,
    enum: ['P', 'S', ''],
    default: '',
   },
  },

  amount: amountSchema,
  address: addressSchema,

  notes: {
   customer: {
    type: String,
    default: '',
   },
   store: {
    type: String,
    default: '',
   },
  },
  amountPaid: amountPaidSchema,
  status: {
   type: String,
   enum: [
    'Pending',
    'Processing',
'Shipped'
,
    'Rejected',
    'Approved',
    'Delivered',
'Returned',
    'Canceled',
   ],
   default: 'Pending',
  },
  deepStatus: [
   {
    title: String,
    msg: String,
    st: Boolean,
    ts: Number,
   },
  ],
  cancel: orderCancelSchema,
  delivery: {
   status: {
    type: String,
    enum: ['Pending','Shipped', 'Delivered', 'Returned'],
    default: 'Pending',
   },
   tracking_id: {
    type: String,
    default: '',
   },
   url: {
    type: String,
    default: '',
   },
  },

  // updatedAt: {
  // 	type: Date,
  // 	default: Date.now
  // },
  // createdAt: {
  // 	type: Date,
  // 	default: Date.now
  // }
 },
 {
  timestamps: true,
 }
);

const Order = mongoose.model('Orders', orderSchema);

//the indexes
orderSchema.index({ order_id: 1 }, { name: 'order_id_1', unique: true });

orderSchema.index(
 { store_id: 1, order_id: 1 },
 { name: 'store_id_1_order_id_1', unique: true }
);

module.exports = Order;
