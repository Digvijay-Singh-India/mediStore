const { Product, copy } = require('../../src/db');

async function getProduct(req, res, next) {
 try {
  const { id = '' } = req.query;
  let result = await Product.findOne({ store_id: req.store.id, sku_id: id });
  res.json({ st: true, res: copy(result) });
 } catch (error) {
  return next(error);
 }
}
module.exports = getProduct;
