const { User } = require('../db');
const Store = require('../store');
const { decrypt } = require('../utility/mycrypto');
async function userAuth(req, res, next) {
 try {
  req.user = {};
  // req.store.id = 'S2024001';
  // return next();
  ///console.log(req.headers);
  req.user = { st: false, id: '', role: '' };
  let userKey = req.get('Authorization') || null;
  let msg = 'Not valid User.';
  let decrypted = JSON.parse(decrypt(userKey));
  if (decrypted && decrypted.uid) {
   req.user.st = true;
   req.user.sid = decrypted.sid;
   req.user.uid = decrypted.uid;
   req.user.role = decrypted.role;
   //req.user.sid = 'S2024001';
   // const user = await User.findOne(decrypted);
   // if (user) {
   //  req.user.st = true;
   //  req.user.store = user.store_id;
   //  req.user.id = user.user_id;
   //  req.user.role = user.role;
   // }
  }
  if (req.user.st !== true) {
   return res.status(403).json({ st: false, msg });
  }
  next();
 } catch (error) {
  next(error);
 }
}
module.exports = userAuth;
