const storeData = [];

function get(key) {
 // console.log(storeData.length, storeData);
 console.log(storeData.length);
 return storeData.find((e) => e.key == key);
}
function set(key, value) {
 // value.redish = 'redis';
 // console.log(key);
 // setTimeout(() => storeData.push({ key, value }), 1);
}
module.exports = { get, set };
