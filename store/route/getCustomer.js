const { User, copy } = require('../../src/db');

async function getCustomer(req, res, next) {
 try {
  let { id = '' } = req.query;

  //const result = await User.findOne({ store_id: req.user.sid, user_id: id });

  let result = await User.aggregate([
   { $match: { user_id: id } },
   {
    $lookup: {
     from: 'orders',
     localField: 'user_id',
     foreignField: 'user_id',
     as: 'orders',
    },
   },

   { $unwind: '$orders' }, // Deconstruct the orders array
   { $sort: { 'orders.order_date': -1 } }, // Sort by order_date in ascending order
   {
    $group: {
     _id: '$_id',
     user_id: { $first: '$user_id' },
     name: { $first: '$name' },
     mobile: { $first: '$mobile' },
     email: { $first: '$email' },
     img: { $first: '$img' },
     createdAt: { $first: '$createdAt' },
     role: { $first: '$role' },
     orders: { $push: '$orders' }, // Reconstruct the orders array
    },
   },
   {
    $project: {
     user_id: 1,
     name: 1,
     mobile: 1,
     email: 1,
     img: 1,
     createdAt: 1,
     role: 1,
     orders: { order_id: 1, order_date: 1, status: 1 },
    },
   },
  ]);

  if (result?.length) {
   result = result[0];
   const mobile = result.mobile;
   result.mobile = '******' + mobile.substring(mobile.length - 4);
  }
  return res.json({ st: true, res: copy(result) });
 } catch (error) {
  next(error);
 }
}
module.exports = getCustomer;
