const { User } = require('../../src/db');
const { idGenerator } = require('../../src/idGenerator');
const fun = require('../../src/utility/fun');
const { hashPassword, encrypt } = require('../../src/utility/mycrypto');

async function userRegister(req, res, next) {
 try {
  const out = { st: false, msg: '' };
  let { name = '', mob = '', email = '', pass = '' } = req.body;

  name = fun.filter_value(name);
  mob = fun.validate_mob(mob);
  email = fun.validate_email(email);
  pass = fun.filter_value(pass);

  if (fun.isEmpty(name)) {
   out.msg = 'Name is empty.';
   return res.json(out);
  }
  if (fun.isEmpty(mob)) {
   out.msg = 'Mobile no is empty.';
   return res.json(out);
  }
  if (fun.isEmpty(email)) {
   out.msg = 'Email address is empty';
   return res.json(out);
  }
  if (fun.isEmpty(pass) || pass.length < 6) {
   out.msg = 'Password must be at least 6 digits';
   return res.json(out);
  }

  let existUser = await User.exists({ store_id: req.store.id, mobile: mob });
  if (existUser) {
   out.msg = 'This user is already registered try to login.';
   return res.json(out);
  }

  let { user_id = '' } = await idGenerator('user_id');

  let user = await User.create({
   store_id: req.store.id,
   user_id: user_id,
   name: name,
   mobile: mob,
   email: email,
   role: 'Customer',
   password: hashPassword(pass),
  });
  if (user.__v == 0) {
   let uToken = encrypt(JSON.stringify({ sid: req.store.id, uid: user_id }));
   //let result
   return res.json({
    st: true,
    res: { user_id, name, mobile: mob, email, uToken },
   });
  } else {
   return res.json({ st: false, msg: 'User creating error' });
  }
 } catch (error) {
  return next(error);
 }
}

module.exports = userRegister;
