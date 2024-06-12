const { Product, copy } = require('../../src/db');

async function clintIndexedDb(req, res, next) {
 try {
  let { ts = '' } = req.body;
  // console.log(req.body);
  const out = { st: false, res: [] };
  return res.json(out);
  if (ts < 100000000000) {
   let name = await Product.find({ store_id: 'S2024001' }).select('name');
   name = copy(name);
   console.log(name.length);
   out.st = true;
   out.res = name;
   out.createdAt = new Date().getTime();
  }

  // writeFileSync('pro2.json', JSON.stringify(j));

  res.json(out);
 } catch (error) {
  return next(error);
 }
}
module.exports = clintIndexedDb;
