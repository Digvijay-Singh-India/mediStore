const Config = require('../../src/Config');
const { User, Store, copy } = require('../../src/db');

const fun = require('../../src/utility/fun');
const { hashPassword, encrypt } = require('../../src/utility/mycrypto');
const userImgUrl = Config.get('assetsUrl') + 'img/user/';

async function login(req, res, next) {
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
   mobile: mob,
   password: hp,
  });

  if (user && user.role != 'Customer') {
   const store = await Store.findOne({ store_id: user.store_id });

   let uToken = encrypt(
    JSON.stringify({
     sid: user.store_id,
     uid: user.user_id,
     role: user.role,
    })
   );

   // let img=user.img?userImgUrl+user.img:''
   return res.json({
    st: true,
    res: {
     store_id: user.store_id,
     user_id: user.user_id,
     name: user.name,
     mobile: user.mobile,
     email: user.email,
     img: user.img ? userImgUrl + user.img : '',
     role: user.role,
     uToken,
    },
    store: copy(store),
   });
  } else {
   return res.json({ st: false, msg: 'mobile no or password is wrong ' });
  }
 } catch (error) {
  return next(error);
 }
}

module.exports = login;
