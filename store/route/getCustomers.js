const { User, copy } = require('../../src/db');

async function getCustomers(req, res, next) {
 try {
  let { q = '', skip = 0, limit = 10 } = req.query;
  limit = 20; // limit > 10 ? 20 : limit;
  let results = await User.where('store_id')
   .equals(req.user.sid)
   .where('role')
   .equals('Customer')
   .where('name')
   .equals(new RegExp(`^${q}`, 'i'))
   .skip(skip * 1)
   .limit(limit * 1)
   // .hint('store_id_1_name_1')
   .select({
    user_id: 1,
    name: 1,
    mobile: 1,
    // pack_size_label: 1,

    // price: 1,
   });
  // .sort({ order_date: -1 });
  results = copy(results);

  results.forEach((e) => {
   const mobile = e.mobile;
   e.mobile = '******' + mobile.substring(mobile.length - 4);
  });

  const nextId = results.length == limit ? limit * 1 + skip * 1 : null;
  const previousId = -(limit * 1) + skip * 1;

  return res.json({
   st: true,
   nextId,
   previousId,
   res: results,
  });
 } catch (error) {
  next(error);
 }
}

module.exports = getCustomers;
