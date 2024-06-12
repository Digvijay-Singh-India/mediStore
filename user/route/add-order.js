const Store = require('../../src/store');
const coupon = require('../../src/couponValidate');
const { Product, Order } = require('../../src/db');
const { id } = require('../../src/idGenerator');
async function getPro(store_id, sku_id) {
 try {
  const query = {
   store_id,
   sku_id,
  };
  return await Product.findOne(query)
   .hint('store_id_1_sku_id_1')
   .select(['sku_id', 'price', 'name', 'image_url', 'pack_size_label']);
 } catch (error) {
  return false;
 }
}
async function addOrderDb(obj) {
 try {
  return new Order(obj).save();
 } catch (err) {
  return false;
 }
}
async function addOrder(req, res, next) {
 try {
  const body = req.body;
  const card = req.body.card;
  let subtotal = 0;
  let dis = 0;
  let deliveryCharge = 0;
  let total = 0;
  let co = '';
  let item = [];
  const promises = card.item.map(async (e) => {
   const product = await getPro(req.store.id, e.sku_id);
   if (product) {
    const newProduct = JSON.parse(JSON.stringify(product));
    newProduct.count = e.count;
    item.push(newProduct);
    subtotal += (product.price * 1 * e.count).toFixed(2) * 1;
   }
  });
  await Promise.all(promises);
  const store = await Store(req.store.id);
  subtotal = subtotal.toFixed(2);
  if (card.subtotal == subtotal) {
   if (card.dis > 0) {
    co = await coupon(req.store.id, card.coupon.code);
    if (co && co.value) {
     dis = co.type == 'P' ? (subtotal * co.value) / 100 : co.value;
     dis = dis.toFixed();
     dis = dis.toFixed(2);
     if (dis == card.dis) {
      total = (subtotal * 1 - dis * 1).toFixed(2);
     }
    }
   } else {
    total = (subtotal * 1 - dis * 1).toFixed(2);
   }
   console.log('s', store.setting);
   if (total < store.setting.minOdrValApplyDelCharge) {
    console.log('dc1=', deliveryCharge);
    deliveryCharge = store.setting.deliveryCharge;
   }

   total = (total * 1 + deliveryCharge).toFixed(2);
  }
  console.log('t=', total, 'tc=', card.totalWD);
  if (total != card.totalWD) {
   return res.json({
    st: false,
    errcode: 5,
    msg: 'some data is wrong',
   });
  } else {
   const deepStatus =
    body.payMethod == 'UPI'
     ? [
        {
         title: 'Order Placed',
         msg: '',
         st: true,
         ts: Date.now(),
        },
        {
         title: 'Payment Status',
         msg: '',
         st: false,
         ts: '', //Date.now(),
        },
       ]
     : [
        {
         title: 'Order Placed',
         msg: '',
         st: true,
         ts: Date.now(),
        },
        {
         title: 'Order Processing',
         msg: '',
         st: false,
         ts: '',
        },
       ];

   let obj = {
    store_id: req.store.id,
    order_id: id('order'),
    user_id: body.uid,
    order_date: new Date(),
    items: item,
    coupon: card.coupon,
    amount: {
     subtotal: (subtotal * 1).toFixed(2),
     discount: (dis * 1).toFixed(2),
     deliveryCharge: (deliveryCharge * 1).toFixed(2),
     total: (total * 1).toFixed(2),
    },
    address: {
     name: body.name,
     mobile: body.mob,
     email: body.email,
     street: body.addressL1 + '\n' + body.addressL2,
     country: body.country,
     state: body.state,
     dist: body.dist,
     city: body.city || '',
     postalCode: body.pincode,
    },
    notes: {
     customer: body.notes || '',
    },
    amountPaid: {
     method: body.payMethod,
     status: 'Unpaid',
    },
    status: 'Pending',
    deepStatus: deepStatus,
   };
   let ab = await addOrderDb(obj);
   if (ab.order_id && ab.__v == 0) {
    return res.json({
     st: true,
     order_id: ab.order_id,
    });
   } else {
    return res.json({
     st: false,
    });
   }
  }
 } catch (err) {
  return next(err);
  console.error('Error adding order:', err);
  res.status(500).json({
   st: false,
   msg: 'Internal server error',
  });
 }
}
module.exports = addOrder;
