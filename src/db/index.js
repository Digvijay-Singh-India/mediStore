const mongoose = require('mongoose');

const Store = require('./store.module');
const Page = require('./page.module');
const Coupon = require('./coupon.module');
const User = require('./user.module');
const Order = require('./order.module');
const Product = require('./product.module');
const Image = require('./image.module');
const Payment = require('./payment.modul');
const Subscription = require('./subscription.modul');
const config = require('../Config');
const StorePayment = require('./storePayment.module');
const idSetter = require('./idSetter.module');
const Manufacturer = require('./manufacturer.module');
const PackSize = require('./packSize.module');

async function connectToDatabase() {
 try {
  await mongoose.connect(config.get('mongo_connection_string'));
  console.log('Mongodb is connected');
 } catch (error) {
  console.error('Error connecting to MongoDB:', error);
 }
}

connectToDatabase();

function copy(result) {
 if (result) {
  let r = JSON.parse(JSON.stringify(result));

  if (r && r.length) {
   r.forEach((e) => {
    if (e && e._id) {
     delete e._id;
    }
    if (e && e.__v) {
     delete e.__v;
    }
   });
  }
  if (r && r._id) {
   delete r._id;
   delete r.__v;
  }
  return r;
 } else {
  return result;
 }
}

//, {upsert: true });

async function k() {
 // await Product.updateMany(
 //  { type: 'allopathy' },
 //  { $set: { type: 'Allopathy' } }
 // );
 // let y = await Product.updateMany({}, { $set: { description: '' } });
 //let y2 = await PackSize.updateMany({}, { $set: { store_id: 0 } });
 //console.log(y);
 // console.log(y2);
 // { address: /^S/ }
 // 	let y = await Product.updateMany({
 // 		image_url: 'https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/hx2gxivwmeoxxxsc1hix.png'
 // 	//image_url:new RegExp('^h','i')
 // }, {
 // 		 store_id: 'N'+config.get('store')
 // 	});
 //  let y = await Product.deleteMany({
 //   image_url:
 //    'https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/hx2gxivwmeoxxxsc1hix.png',
 //  });
 //  console.log(y);
}

k();

module.exports = {
 copy,
 idSetter,
 Store,
 Page,
 Coupon,
 User,
 Order,
 Manufacturer,
 PackSize,
 Product,
 Image,
 Payment,
 Subscription,
 StorePayment,
};
