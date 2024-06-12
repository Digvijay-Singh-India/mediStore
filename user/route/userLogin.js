const { User } = require('../../src/db');
const { idGenerator } = require('../../src/idGenerator');
const fun = require('../../src/utility/fun');
const { hashPassword, encrypt } = require('../../src/utility/mycrypto');

async function userLogin(req, res, next) {
 try {
  const out = { st: false, msg: '' };
  let { mob = '', pass = '' } = req.body;

  mob = fun.validate_mob(mob);
  pass = fun.filter_value(pass);

  if (fun.isEmpty(mob)) {
   out.msg = 'Invalid mobile no';
   return res.json(out);
  }
  let hp = hashPassword(pass);

  let user = await User.findOne({
   store_id: req.store.id,
   role: 'Customer',
   mobile: mob,
   password: hp,
  });

  if (user) {
   let uToken = encrypt(
    JSON.stringify({ store_id: req.store.id, user_id: user.user_id })
   );
   return res.json({
    st: true,
    res: {
     user_id: user.user_id,
     name: user.name,
     mobile: user.mobile,
     email: user.email,
     uToken,
    },
   });
  } else {
   return res.json({ st: false, msg: 'mobile no or password is wrong ' });
  }
 } catch (error) {
  return next(error);
 }
}

module.exports = userLogin;
