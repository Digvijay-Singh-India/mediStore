const mongoose = require('mongoose');
const { isEmpty } = require('validator');
const Config = require('../../src/Config');
const { User, Store, Subscription, copy } = require('../../src/db');

const fun = require('../../src/utility/fun');
const { hashPassword, encrypt } = require('../../src/utility/mycrypto');
const { idGenerator } = require('../../src/idGenerator');
const { updateSearchIndex } = require('../../src/db/user.module');
const userImgUrl = Config.get('assetsUrl') + 'img/user/';

async function storeSetup(req, res, next) {
 // const session = await mongoose.startSession();
 // session.startTransaction();

 try {
  const out = { st: false, msg: '' };
  let {
   storeName = '',
   licenseNumber = '',
   gstNumber = '',
   address = '',
   pincode = '',
   contact = '',
   cod = '',
   upi = '',
   upi_id = '',
   minOrderValue = '',
   minOdrValApplyDelCharge = '',
   deliveryCharge = '',
  } = req.body;
  const isStore = await Store.findOne({ store_id: req.user.sid });

  if (isStore) {
   out.msg = 'Store already register';
   out.event = ['logout'];
   return res.json(out);
  }

  if (
   isEmpty(storeName) ||
   isEmpty(licenseNumber) ||
   isEmpty(address) ||
   isEmpty(pincode) ||
   isEmpty(contact) ||
   isEmpty(minOrderValue) ||
   isEmpty(minOdrValApplyDelCharge) ||
   isEmpty(deliveryCharge)
  ) {
   out.msg = 'some data is empty 1';
   out.body = req.body;
   return res.json(out);
  }
  if (!cod && !upi) {
   out.msg = 'some data is empty 2';
   return res.json(out);
  }

  if (upi && !upi_id) {
   out.msg = 'some data is empty 3';
   return res.json(out);
  }
  const payMethod = [];
  if (cod) {
   payMethod.push('COD');
  }
  if (upi) {
   payMethod.push('UPI');
  }

  const { uid = '', sid = '' } = req.user;

  const order_id = await idGenerator('order_id');

  const store = await Store.create(
   //  [
   {
    store_id: sid,
    admin_id: uid,
    name: storeName,
    licenseNumber,
    gstNumber,
    address,
    pincode,
    contact,
    active: { st: false, msg: 'Wait for verification' },
    storeKey: encrypt(sid),
    setting: {
     minOrderValue,
     minOdrValApplyDelCharge,
     deliveryCharge,
     payMethod,
     upi: { upi_id: upi ? upi_id : '' },
    },
   }
   // ],
   // { session: session }
  );

  if (store && store.__v == 0) {
   let copyStore = copy(store);
   delete copyStore.__v;

   const order_date = new Date();
   const duration = '3 Month';
   const startDate = order_date;
   const endDate = new Date(order_date.getTime()).setMonth(
    order_date.getMonth() + 3
   );

   const subs = await Subscription.create(
    {
     store_id: sid,
     order_id,
     order_date,
     duration,
     startDate,
     endDate,
     plan: 'Free',
    }
    // { session: session }
   );

   if (subs && subs.__v == 0) {
    let u = await Store.findByIdAndUpdate(
     store._id,
     {
      $set: { subscription_id: order_id },
     }
     // { session: session, new: true }
    );
    copyStore.subscription_id = order_id;
   }

   out.st = true;
   out.res = copyStore;
  }

  // await session.commitTransaction();
  // session.endSession();
  res.json(out);
 } catch (error) {
  // await session.abortTransaction();
  // session.endSession();
  next(error);
 }
}

module.exports = storeSetup;

// const { isEmpty } = require('validator');
// const Config = require('../../src/Config');
// const { User, Store, Subscription, copy } = require('../../src/db');

// const fun = require('../../src/utility/fun');
// const { hashPassword, encrypt } = require('../../src/utility/mycrypto');
// const { idGenerator } = require('../../src/idGenerator');
// const { updateSearchIndex } = require('../../src/db/user.module');
// const userImgUrl = Config.get('assetsUrl') + 'img/user/';

// async function storeSetup(req, res, next) {
//  try {
//   const out = { st: false, msg: '' };
//   let {
//    storeName = '',
//    licenseNumber = '',
//    gstNumber = '',
//    address = '',
//    pincode = '',
//    contact = '',
//    cod = '',
//    upi = '',
//    upi_id = '',
//    minOrderValue = '',
//    minOdrValApplyDelCharge = '',
//    deliveryCharge = '',
//   } = req.body;

//   if (
//    isEmpty(storeName) ||
//    isEmpty(licenseNumber) ||
//    isEmpty(address) ||
//    isEmpty(pincode) ||
//    isEmpty(contact) ||
//    isEmpty(minOrderValue) ||
//    isEmpty(minOdrValApplyDelCharge) ||
//    isEmpty(deliveryCharge)
//   ) {
//    out.msg = 'some data is empty 1';
//    out.body = req.body;
//    return res.json(out);
//   }
//   if (!cod && !upi) {
//    out.msg = 'some data is empty 2';
//    return res.json(out);
//   }

//   if (upi && !upi_id) {
//    out.msg = 'some data is empty 3';
//    return res.json(out);
//   }
//   const payMethod = [];
//   if (cod) {
//    payMethod.push('COD');
//   }
//   if (upi) {
//    payMethod.push('UPI');
//   }

//   const { uid = '', sid = '' } = req.user;
//   // const { store_id = '' } = await idGenerator('store_id');

//   const order_id = await idGenerator('order_id');

//   const store = await Store.create({
//    store_id: sid,
//    admin_id: uid,
//    name: storeName,
//    licenseNumber,
//    gstNumber,
//    address,
//    pincode,
//    contact,
//    active: { st: false, msg: 'Waite for verification' },

//    setting: {
//     minOrderValue,
//     minOdrValApplyDelCharge,
//     deliveryCharge,
//     payMethod,
//     upi_id: upi ? upi_id : '',
//    },
//   });
//   // mob = fun.validate_mob(mob);
//   // pass = fun.filter_value(pass);
//   if (store && store.__v == 0) {
//    let copyStore = copy(store);
//    delete copyStore.__v;
//    // delete copyStore.__v;
//    // delete copyStore.__v;
//    // delete copyStore.__v;
//    // delete copyStore.__v;
//    out.st = true;
//    out.res = copyStore;
//    const order_date = new Date();
//    //const order_date2 = new Date();
//    const duration = '3 Month';
//    const startDate = order_date;
//    const endDate = new Date(order_date.getTime()).setMonth(
//     order_date.getMonth() + 3
//    );

//    const subs = await Subscription.create({
//     store_id: sid,
//     order_id,
//     order_date,
//     duration,
//     startDate,
//     endDate,
//     plan: 'Free',
//    });

//    if (subs && subs.__v == 0) {
//     let u = await Store.findByIdAndUpdate(store._id, {
//      $set: { subscription_id: order_id },
//     });
//     console.log(u);
//     out.res.subscription_id = order_id;
//    }
//   }
//   // console.log(store);

//   res.json(out);
//  } catch (error) {
//   next(error);
//  }
// }
// module.exports = storeSetup;
