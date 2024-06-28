const { Product, copy } = require('../../src/db');
const { get, set } = require('../../src/middlewares/myredish');

async function searchProducts(req, res, next) {
 try {
  let { q = '', skip = 0, limit = 10 } = req.query;
  limit = limit > 10 ? 10 : limit;
  let key = q + '@$' + skip + '@$' + req.store.id;
  // let re = get(key);

  // if (re) {
  //  return res.json(re.value);
  // }
  let results = await Product.where('store_id')
   .equals(req.store.id)
   .where('name')
   .equals(new RegExp(`^${q}`, 'i'))
   .skip(skip * 1)
   .limit(limit * 1)
   .hint('store_id_1_name_1')
   .select({
    id: 1,
    name: 1,
    sku_id: 1,
    pack_size_label: 1,
    rx_required: 1,
    price: 1,
    image_url: 1,
   });

  const nextId = results.length == limit ? limit * 1 + skip * 1 : null;
  const previousId = -(limit * 1) + skip * 1;
  set(key, {
   st: true,
   nextId,
   previousId,
   res: copy(results),
  });

  //return res.json({ msg: 'hgj' });
  return res.json({
   st: true,
   nextId,
   previousId,
   res: copy(results),
  });
 } catch (e) {
  return next(e);
  console.log(e);
  res.json({
   st: false,
  });
 }
}
module.exports = searchProducts;
