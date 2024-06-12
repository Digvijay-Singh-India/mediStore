const { Order, copy } = require('../../src/db');

async function passReset(req, res, next) {
 try {
  let { pass = '', id = '' } = req.body;
  let result = await Order.findOne({
   store_id: req.store.id,
   order_id: id,
  });
  result = copy(result);

  return res.json({
   st: true,
   res: result,
  });
 } catch (error) {
  console.log(error);
  next(error);
 }
}

module.exports = passReset;
