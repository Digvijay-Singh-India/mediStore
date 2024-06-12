const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema(
 {
  store_id: {
   type: String,
   required: true,
  },
  user_id: String,
  url: { type: String, required: true },
  tag: String,
  data: Object,
 },
 { timestamps: true }
);

const image = mongoose.model('images', imageSchema);

module.exports = image;
