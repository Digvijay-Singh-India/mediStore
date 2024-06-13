const { Store, copy } = require('../../src/db');

async function getstore(req, res, next) {
 try {
  let result = await Store.findOne({ store_id: req.store.id }).select([
   'name',
   'setting',
   'address',
   'pincode',
   'contact',
   'logo',
   'img',
   'active',
   'setting',
   {
    setting: {
     minOrderValue: true,
     minOdrValApplyDelCharge: true,
     deliveryCharge: true,
     payMethod: true,
    },
   },
  ]);
  //console.log(result);
  const result2 = copy(result);

  result2.minOrderValue = result.setting.minOrderValue;
  result2.minOdrValApplyDelCharge = result.setting.minOdrValApplyDelCharge;
  result2.deliveryCharge = result.setting.deliveryCharge;
  result2.payMethod = result.setting.payMethod;
  delete result2.setting;
  return res.json({ st: true, res: result2 });
 } catch (error) {
  return next(error);
 }
}
module.exports = getstore;
