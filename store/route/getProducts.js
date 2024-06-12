const { Order, copy, Product } = require('../../src/db');

async function getProducts(req, res, next) {
 try {
  let { q = '', skip = 0, limit = 10 } = req.query;
  limit = 20; // limit > 10 ? 20 : limit;
  let results = await Product.where('store_id')
   .equals(req.user.sid)
   .where('name')
   .equals(new RegExp(`^${q}`, 'i'))
   .skip(skip * 1)
   .limit(limit * 1)
   .hint('store_id_1_name_1')
   .select({
    sku_id: 1,
    name: 1,

    pack_size_label: 1,

    price: 1,
   });
  // .sort({ order_date: -1 });
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
  return next(e);
  console.log(e);
  res.json({
   st: false,
  });
 }
}

module.exports = getProducts;
