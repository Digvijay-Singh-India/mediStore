const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema(
 {
  store_id: {
   type: String,
   required: true,
  },
  admin_id: {
   type: String,
   required: true,
  },
  name: {
   type: String,
   required: true,
  },

  licenseNumber: {
   type: String,
   default: '',
  },
  gstNumber: {
   type: String,
   default: '',
  },
  address: {
   type: String,
   default: '',
  },
  pincode: {
   type: Number,
   default: '',
  },
  contact: { type: String, default: '' },
  logo: {
   type: String,
   default: '',
  },
  img: {
   type: String,
   default: '',
  },
  active: {
   st: { type: Boolean, required: true },
   msg: { type: String, default: '' },
  },
  subscription_id: { type: String, default: '' },
  url: {
   type: String,
   default: '',
  },
  storeKey: {
   type: String,
   default: '',
  },
  setting: {
   minOrderValue: {
    type: Number,
    default: 100,
   },
   minOdrValApplyDelCharge: {
    type: Number,
    default: 500,
   },
   deliveryCharge: {
    type: Number,
    default: 50,
   },
   maxOneProToCard: {
    type: Number,
    default: 20,
   },
   payMethod: {
    type: [String],
    default: ['UPI'],
   },
   upi: {
    AutoVerify: {
     type: Boolean,
     default: false,
    },
    upi_id: {
     type: String,
     default: false,
    },
    name: {
     type: String,
     default: '',
    },
    merchant_key: {
     type: String,
     default: '',
    },
   },
  },
 },
 {
  timestamps: true,
 }
);

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
