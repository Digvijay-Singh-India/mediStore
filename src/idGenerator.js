const { idSetter } = require('./db');

const orderid = require('order-id')('Mstore');

let o = [];

function generateId() {
 let c = 0;
 let id = '';
 do {
  let idg = orderid.generate() + Math.floor(Math.random() * (9 - 0 + 1)) + 0;
  if (!o.includes(idg)) {
   o.push(idg);
   o.length > 1000 ? o.splice(0, 10) : '';
   id = idg;
  }
 } while (id == '');
 {
 }

 return id;
}

function id(type) {
 //	console.log(generateId());
 switch (type) {
  case 'order':
   return generateId();
   break;
  case 'store':
   let u = idSetter.findByIdAndUpdate(
    '',
    { $inc: { store_id: 1 } },
    { upsert: true }
   );
   console.log(u);
   return generateId().replace(/-/, 'S');

   break;
  case 'user':
   return generateId().replace(/-/, 'U');

   break;
  case 'transaction':
   return generateId().replace(/-/, 'TR');
   break;
  case 'value':
   break;
  case 'value':
   break;
  case 'value':
   break;
  case 'value':
   break;
  case 'value':
   break;
  case 'value':
   break;
  case 'value':
   break;

  default:
   break;
 }
}

async function idGenerator(key) {
 switch (key) {
  case 'store_id':
   return idSetter.findByIdAndUpdate(
    '66279430e7bfb118d2609d4b',
    { $inc: { store_id: 1 } },
    { upsert: true }
   );
   break;
  case 'user_id':
   return idSetter.findByIdAndUpdate(
    '66279430e7bfb118d2609d4b',
    { $inc: { user_id: 1 } },
    { upsert: true }
   );
  case 'productId':
   return idSetter.findByIdAndUpdate(
    '66279430e7bfb118d2609d4b',
    { $inc: { productId: 1 } },
    { upsert: true }
   );
  case 'order_id':
   return generateId();
  case 'transaction_id':
   return generateId().replace(/-/, 'TR');
  default:
   break;
 }
}

module.exports = { id, idGenerator };
// let i = 0;
// setInterval(async () => {
//  return;
//  i++;
//  let u = await idSetter
//   .findByIdAndUpdate(
//    '66279430e7bfb118d2609d4b',
//    { $inc: { store_id: 1 } },
//    { upsert: true }
//   )
//   .select('store_id');
//  //console.log(u.store_id);
//  console.log('i', i);
// }, 0);
