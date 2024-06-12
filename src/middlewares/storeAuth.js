const Store = require('../store');
const { decrypt } = require('../utility/mycrypto');
async function storeAuth(req, res, next) {
 req.store = {};
 // req.store.id = 'S2024001';
 // return next();
 ///console.log(req.headers);
 req.store = { st: false, id: '' };
 let storeKey = req.get('Store-Key');
 let msg = 'Not valid Store Url';

 if (storeKey) {
  let decrypted = decrypt(storeKey);

  const store = await Store(decrypted);
  // console.log(decrypted);
  // console.log(store);
  if (store && store.active.st === true) {
   req.store.st = true;
   req.store.id = decrypted;
  } else if (store && store.active && store.active.msg) {
   msg = store.active.msg;
  }
 }
 if (req.store.st !== true) {
  return res.status(403).json({ st: false, msg });
 }
 // console.log(req.store);
 next();
}
module.exports = storeAuth;
