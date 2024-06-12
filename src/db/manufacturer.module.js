const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manufacturerSchema = new Schema(
 {
  store_id: {
   type: String,
   required: true,
  },
  name: {
   type: String,
   required: true,
  },
  address: {
   type: String,
   default: '',
  },
 },
 { timestamps: true }
);

const Manufacturer = mongoose.model('manufacturers', manufacturerSchema);

module.exports = Manufacturer;
