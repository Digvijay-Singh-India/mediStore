const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
 {
  store_id: {
   type: String,
   required: true,
  },
  // id: {
  //  type: String,
  //  required: true,
  // },
  sku_id: {
   type: String,
   required: true,
   unique: true,
  },
  name: {
   type: String,
   required: true,
  },
  manufacturer_name: {
   type: String,
   // required: true,
   default: '',
  },
  type: {
   type: String,
   required: true,
  },
  pack_size_label: {
   type: String,
   required: true,
  },
  rx_required: {
   type: String,
   // required: true,
   default: '',
  },

  short_composition: {
   type: String,
   // required: true,
   default: '',
  },
  description: {
   type: String,
   default: '',
  },
  price: {
   type: Number,
   required: true,
  },
  slug: {
   type: String,
   // required: true,
   default: '',
  },
  image_url: {
   type: String,
   required: true,
  },
  status: {
   type: String,
   enum: ['Public', 'Private'],
   required: true,
  },
 },
 {
  timestamps: true,
 }
);

productSchema.pre('find', function (next) {
 try {
  //	console.log(this);
  //this._conditions.store_id = config.get('store');
  next();
 } catch (error) {
  return false;
 }
});
productSchema.pre('findOne', function (next) {
 try {
  //this._conditions.store_id = config.get('store');
  next();
 } catch (error) {
  return false;
 }
});

productSchema.index({ store_id: 1, name: 1 }, { name: 'store_id_1_name_1' });
productSchema.index(
 { store_id: 1, sku_id: 1 },
 { name: 'store_id_1_sku_id_1', unique: true }
);

const Product = mongoose.model('Product2s', productSchema);

module.exports = Product;
