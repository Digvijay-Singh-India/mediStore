const { isEmail } = require('validator');
const { User } = require('../../src/db');
const { idGenerator } = require('../../src/idGenerator');
const fun = require('../../src/utility/fun');
const { hashPassword, encrypt } = require('../../src/utility/mycrypto');
// const userImgUrl = Config.get('assetsUrl')+'img/user/';
async function register(req, res, next) {
 try {
  const out = { st: false, msg: '' };
  let { name = '', mob = '', email = '', pass = '', role = 'Admin' } = req.body;

  role = fun.filter_value(role);
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
  if (!isEmail(email)) {
   out.msg = 'Email address is empty';
   return res.json(out);
  }
  if (fun.isEmpty(pass) || pass.length < 6) {
   out.msg = 'Password must be at least 6 digits';
   return res.json(out);
  }

  let existUser = await User.exists({ mobile: mob });
  if (existUser) {
   out.msg = 'This user is already registered try to login.';
   return res.json(out);
  }

  let { user_id = '' } = await idGenerator('user_id');
  let { store_id = '' } = await idGenerator('store_id');

  let user = await User.create({
   store_id,
   user_id: user_id,
   name: name,
   mobile: mob,
   email: email,
   role: role,
   password: hashPassword(pass),
  });
  if (user.__v == 0) {
   let uToken = encrypt(JSON.stringify({ sid: store_id, uid: user_id, role }));
   //let result
   return res.json({
    st: true,
    res: {
     store_id,
     user_id,
     name,
     mobile: mob,
     email,
     img: '',
     role,
     uToken,
    },
   });
  } else {
   return res.json({ st: false, msg: 'User creating error' });
  }
 } catch (error) {
  return next(error);
 }
}

module.exports = register;
