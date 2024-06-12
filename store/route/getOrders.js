const { Order, copy } = require('../../src/db');

async function getOrders(req, res) {
 console.log(req.user);
 try {
  let { uid = '', skip = 0, limit = 10 } = req.query;
  limit = limit > 10 ? 10 : limit;
  let results = await Order.where('store_id')
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
   .sort({ order_date: -1 });
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
  res.json({
   st: false,
  });
 }
}

module.exports = getOrders;
