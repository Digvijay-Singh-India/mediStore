const { Store } = require('./db/index');

async function store(store_id = '') {
 try {
  return Store.findOne({
   store_id,
  });
  return await Store.where('store_id').equals();
 } catch (error) {
  return;
 }
}

module.exports = store;
