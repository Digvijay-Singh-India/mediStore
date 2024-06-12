const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packSizeSchema = new Schema(
 {
  store_id: {
   type: String,
   required: true,
  },
  size: {
   type: String,
   required: true,
  },
 },
 { timestamps: true }
);

const PackSize = mongoose.model('packsize', packSizeSchema);

module.exports = PackSize;
