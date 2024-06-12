const Config = require('../../src/Config');
const { User, Store, copy } = require('../../src/db');

const fun = require('../../src/utility/fun');
const { hashPassword, encrypt } = require('../../src/utility/mycrypto');
const userImgUrl = Config.get('assetsUrl') + 'img/user/';

async function getStore(req, res, next) {
 try {
  const out = { st: false, msg: '' };
  let { id = '', ty = '' } = req.query;
  //return res.json(out);
  if (req.user && req.user.role != 'Customer') {
   let store = '';

   if (ty != 1) {
    store = await Store.findOne({ store_id: req.user.sid });
   } else {
    store = await Store.aggregate([
     {
      $match: { store_id: req.user.sid },
     },
     {
      $lookup: {
       from: 'subscriptions',
       localField: 'subscription_id',
       foreignField: 'order_id',
       as: 'subscription',
      },
     },
    ]);
   }

   if (store?.length) {
    store = copy(store[0]);
    if (store.subscription?.length) {
     store.subscription = copy(store.subscription[0]);
    }

    //console.log(script);
   }

   if (store && store.store_id) {
    return res.json({
     st: true,
     res: copy(store),
    });
   } else {
    return res.json({ st: false, msg: 'Not have any registerd store' });
   }
  } else {
   return res.json({ st: false, msg: 'You not valid user ' });
  }
 } catch (error) {
  return next(error);
 }
}

module.exports = getStore;
