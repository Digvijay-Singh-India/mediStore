const Config = require('../../src/Config');
const { Image, Store, copy } = require('../../src/db');
const paymentViewUrl = Config.get('paymentViewUrl');
async function paymentView(req, res) {
 try {
  const { uid = '', id = '' } = req.query;

  let img = await Image.find({
   store_id: req.store.id,
   user_id: uid,
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
  console.log(error);
  res.json({ st: false, msg: error.massage });
 }
}
module.exports = paymentView;
