const { copy, Product } = require('../../src/db');

async function getProduct(req, res, next) {
 try {
  let { id = '' } = req.query;

  // let g = await Product.updateMany({}, { $set: { status: 'public' } });

  let result = await Product.findOne({
   store_id: req.user.sid,
   sku_id: id,
  }).hint('store_id_1_sku_id_1');
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
     title: 'Order Shipped',
     msg: '',
     st: false,
     ts: Date.now(),
     po: 3,
    },
    // {
    //  title: 'Out for Delivery',
    //  msg: '',
    //  st: false,
    //  ts: Date.now(),
    //  po: 4,
    // },
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

  //result.description = `<div><span style="color:#FF0000;"><span style="font-size:18px;">gjkk</span></span></div><ul><li>hjgjgj</li><li>gghfhf</li><li>ghfhfh</li></ul>`;
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

module.exports = getProduct;
