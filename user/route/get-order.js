const { Order, copy } = require('../../src/db');

async function getOrder(req, res, next) {
 try {
  let { uid = '', id = '' } = req.query;
  let result = await Order.findOne({
   store_id: req.store.id,
   order_id: id,
   user_id: uid,
  }).hint('store_id_1_order_id_1');
  result = copy(result);
  if (result == '') {
   result.deepStatus = [
    {
     title: 'Order Placed',
     msg: '',
     st: true,
     ts: Date.now(),
     po: 0,
    },
    {
     title: 'Payment Status',
     msg: '',
     st: false,
     ts: '', //Date.now(),
     po: 1,
    },
    {
     title: 'Order Processing',
     msg: '',
     st: false,
     ts: Date.now(),
     po: 2,
    },
    {
     title: 'In Transit',
     msg: '',
     st: false,
     ts: Date.now(),
     po: 3,
    },
    {
     title: 'Out for Delivery',
     msg: '',
     st: false,
     ts: Date.now(),
     po: 4,
    },
    {
     title: 'Delivered',
     msg: '',
     st: true,
     ts: Date.now(),
     po: 5,
    },
    {
     title: 'Cancelled',
     msg: '',
     st: false,
     ts: Date.now(),
     po: 5,
    },
   ];
  }

  //throw Error('kk');
  return res.json({
   st: true,
   res: result,
  });
 } catch (error) {
  return next(error);
  // return res.json({
  //  st: false,
  // });
 }
}

module.exports = getOrder;
