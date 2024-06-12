const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
 {
  store_id: {
   type: String,
   required: true,
   //default: '',
  },
  user_id: {
   type: String,
   required: true,
   unique: true,
  },
  name: {
   type: String,
   required: true,
  },
  email: {
   type: String,
   required: true,
  },
  mobile: {
   type: String,
   required: true,
  },
  img: {
   type: String,
   default: '',
  },
  address: {
   type: Object,
   default: {},
  },
  role: {
   type: String,
   enum: ['Admin', 'Operator', 'Customer'],
   required: true,
  },
  active: {
   type: Boolean,
   default: true,
  },
  password: {
   type: String,
   required: true,
  },
  format_pass: {
   type: String,
   default: '',
  },
 },
 {
  timestamps: true,
 }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;
