/* eslint-disable consistent-return */
const { Order, copy } = require('../../src/db');

async function getOrders(req, res, next) {
 // console.log(req.user);
 try {
  let { uid = '', skip = 0, limit = 10, by = '', q = '' } = req.query;
  limit = limit > 10 ? 10 : limit;

  let query = {
   store_id: req.user.sid,
  };

  const endOfDay = () => {
   q = new Date(q);
   // Adding 1 day to the original date
   const nextDay = new Date(q);
   nextDay.setDate(q.getDate() + 1);
   return nextDay;
  };

  if (q && by) {
   switch (by) {
    case 'Order Id':
     query = {
      store_id: req.user.sid,
      order_id: q,
     };
     break;
    case 'Order Date':
     query = {
      store_id: req.user.sid,
      order_date: {
       $gte: q,
       $lt: endOfDay(),
      },
     };
     break;
    case 'Payment Status':
     query = {
      store_id: req.user.sid,
      'amountPaid.status': q,
     };
     break;
    case 'Status':
     query = {
      store_id: req.user.sid,
      status: q,
     };
     break;

    default:
     query = {
      store_id: req.user.sid,
     };

     break;
   }
  } else {
  }

  let results = await Order.find(query)
   .skip(skip * 1)
   .limit(limit * 1)
   .hint('store_id_1_order_id_1')
   .select({
    order_id: 1,
    order_date: 1,
    amount: 1,
    status: 1,
    amountPaid: 1,
   })
   .sort({
    order_date: -1,
   });

  const results2 = await Order.where('store_id')
   .equals(req.user.sid)

   .skip(skip * 1)
   .limit(limit * 1)
   .hint('store_id_1_order_id_1')
   .select({
    order_id: 1,
    order_date: 1,
    amount: 1,
    status: 1,
    amountPaid: 1,
   })
   .sort({
    order_date: -1,
   });
  results = copy(results);
  const nextId = results.length == limit ? limit * 1 + skip * 1 : null;
  const previousId = -(limit * 1) + skip * 1;
  return res.json({
   st: true,
   nextId,
   previousId,
   res: results,
  });
 } catch (e) {
  console.log(e);
  next(e);
 }
}

module.exports = getOrders;

/**
   let results = await Order.where('store_id')
 */
