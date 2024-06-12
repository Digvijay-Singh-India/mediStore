const store = require('../../src/store');

const { Order } = require('../../src/db');
const config = require('../../src/Config');
//upi://pay?cu=INR&tn=$pName&pa=9234742136@upi&pn=DHAN%20RAJ%20SINGH&am=$toPayA&
//tr=%20&ref=https://codigtrack.site/?oid=$oid

async function link(store_id, amount, order_id) {
 try {
  let payLink = {};
  let storeSetting = await store(store_id);
  storeSetting = storeSetting.setting;

  if (storeSetting.upi.AutoVerify === true) {
   payLink.type = 'auto';
   payLink.link = `upi://pay?cu=INR&tn=${order_id}&pa=${
    storeSetting.upi.upi_id
   }&pn=${storeSetting.upi.name}&am=${amount}&tr=%20&ref=${
    config.get('website') + '/order?id=' + order_id
   }`;
  } else {
   payLink.type = 'manual';
   payLink.link = `upi://pay?cu=INR&tn=${order_id}&pa=${
    storeSetting.upi.upi_id
   }&pn=${storeSetting.upi.name}&am=${amount}&tr=%20&ref=${
    config.get('website') + '/order?id=' + order_id
   }`;
  }

  let encoded = encodeURIComponent(payLink);
  //let decoded = decodeURIComponent(encoded);

  return payLink;
 } catch (error) {
  console.log(error);
  return false;
 }
}

async function generatePayLink(req, res) {
 const out = {
  st: false,
 };
 try {
  const { id = '', uid = '' } = req.query;
  let order = await Order.findOne({
   store_id: req.store.id,
   order_id: id,
   user_id: uid,
  });
  //console.log(order)

  if (order) {
   if (order.amountPaid.method == 'UPI') {
    switch (order.amountPaid.status) {
     case 'Unpaid':
      out.st = true;
      out.res = await link(req.store.id, order.amount.total, order.order_id);
      break;
     case 'Pending':
      break;
     case 'Rejected':
      out.st = true;
      out.res = await link(req.store.id, order.amount.total, order.order_id);

      break;
     case 'Waiting For Approval':
      out.st = true;
      out.re = true;
      out.msg = 'Your payment screenshot is waiting For Approval';
      break;
     case 'Paid':
      out.st = true;
      out.re = true;
      out.msg = 'Your already paid';
      break;
     case 'Approved':
      out.st = true;
      out.re = true;
      out.msg = 'Your payment screenshot approved';
      break;
     case 'value':
      break;

     default:
      break;
    }
   }
  } else {
  }
 } catch (error) {
  console.log(error);
 }
 return res.json(out);
}

module.exports = generatePayLink;
