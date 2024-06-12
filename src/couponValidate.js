const { Coupon } = require('./db');
async function getCoupon(store_id, coupon) {
 try {
  return await Coupon.findOne({
   store_id,
   code: coupon,
   active: true,
  });
 } catch (error) {
  return false;
 }
}

module.exports = getCoupon;
