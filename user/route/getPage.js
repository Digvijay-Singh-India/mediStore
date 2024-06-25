const { copy, Page } = require('../../src/db');

async function getPage(req, res, next) {
 try {
  let { name } = req.query;

  let result = await Page.findOne({ store_id: req.store.id, name: name });

  res.json({ st: true, res: copy(result) });
 } catch (error) {
  return next(error);
 }
}
module.exports = getPage;
