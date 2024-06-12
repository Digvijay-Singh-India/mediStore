const Config = require('../../src/Config');
const { User, Store, copy } = require('../../src/db');

const fun = require('../../src/utility/fun');
const { hashPassword, encrypt } = require('../../src/utility/mycrypto');
const userImgUrl = Config.get('assetsUrl') + 'img/user/';

async function homeDashboard(req, res, next) {
 try {
  const out = { st: false, msg: '' };
  let { id = '' } = req.query;
  //return res.json(out);

  out.st = true;
  out.res = {
   toOrders: 2000,
   toCustomer: 30000,
   toRevenue: 58578,
   toProduct: 567,
  };

  res.json(out);
 } catch (error) {
  return next(error);
 }
}

module.exports = homeDashboard;
