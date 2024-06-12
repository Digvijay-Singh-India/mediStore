const { Coupon, copy } = require('../../src/db');
async function couponValidate(req, res) {
 try {
  let result = await Coupon.findOne({
   store_id: req.store.id,
   code: req.body.code,
   active: true,
  }).select(['code', 'type', 'value']);

  if (result && result.value) {
   result = copy(result);

   result.st = true;
   return res.json({ st: true, res: result });
  } else {
   return res.json({ st: false, msg: 'Not valid coupon code' });
  }
 } catch (error) {
  console.log(error);
  return res.json({ st: false });
 }
}

module.exports = couponValidate;
