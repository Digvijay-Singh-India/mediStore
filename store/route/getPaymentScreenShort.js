const Config = require('../../src/Config');
const { Image, copy } = require('../../src/db');
const paymentViewUrl = Config.get('assetsUrl') + 'img/paymentImg/';
async function getPaymentScreenShort(req, res, next) {
 try {
  const { uid = '', id = '' } = req.query;

  let img = await Image.find({
   store_id: req.user.sid,
   // user_id: uid,
   'data.order_id': id,
  })
   .select(['data', 'url', 'createdAt'])
   .sort({ createdAt: -1 });

  img = copy(img);

  if (img && img.length) {
   img.forEach((e) => {
    e.url = paymentViewUrl + e.url;
   });
  }
  res.json({ st: true, res: img });
 } catch (error) {
  return next(error);
  console.log(error);
  res.json({ st: false, msg: error.massage });
 }
}
module.exports = getPaymentScreenShort;
