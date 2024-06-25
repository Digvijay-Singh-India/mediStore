const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema(
 {
  store_id: {
   type: String,
   required: true,
  },
  name: {
   type: String,
   required: true,
  },
  html: {
   type: String,
   default: '',
  },
 },
 { timestamps: true }
);

const Page = mongoose.model('pages', pageSchema);

module.exports = Page;
