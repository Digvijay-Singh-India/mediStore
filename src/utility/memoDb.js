const { Manufacturer, copy, PackSize } = require('../db');

const memoData = {};

function get(key) {
 return memoData[key];
}
function set(key, data) {
 memoData[key] = data;
}

async function mfgSet() {
 try {
  let result = await Manufacturer.find({});
  // console.log(result);
  if (result) {
   let r2 = [];
   result.forEach((e) => r2.push(e.name));
   set('mfg', r2);
  } else {
   set('mfg', []);
  }
 } catch (error) {}
}

async function packSize() {
 try {
  let result = await PackSize.find({});

  if (result) {
   let r2 = [];
   result.forEach((e) => r2.push(e.size));
   //set('mfg', r2);
   set('packSize', r2);
  } else {
   set('packSize', []);
  }
 } catch (error) {}
}
mfgSet();
packSize();

const memoDb = { get: get, set: set };
module.exports = memoDb;
