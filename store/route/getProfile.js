const { User, copy } = require('../../src/db');

async function getProfile(req, res, next) {
 try {
  let { uid = '' } = req.query;
  let result = await User.findOne({
   store_id: req.store.id,
   user_id: uid,
  });
  result = copy(result);

  return res.json({
   st: true,
   res: result,
  });
 } catch (error) {
  console.log(error);
  next(error);
 }
}

module.exports = getProfile;
