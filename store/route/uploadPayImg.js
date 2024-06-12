const fs = require('fs');

const { Order, Image } = require('../../src/db');
//const {Image }= require('../../src/db');

async function uploadPayImg(req, res) {
 try {
  const dataURL = req.body.img;
  const user_id = req.body.uid;
  const order_id = req.body.order_id;

  const matches = dataURL.match(/^data:image\/(png|jpeg|jpg|webp);base64,/);
  const extension = matches ? matches[1] : null;

  let base64String = dataURL.split(',')[1];

  let url = order_id + '-' + new Date().getTime() + '.' + extension;

  const filePath = 'assets/paymentImg/' + url;

  const binaryData = Buffer.from(base64String, 'base64');

  fs.writeFileSync(filePath, binaryData);

  let imageUrl = await Image.create({
   store_id: req.store.id,
   user_id,
   tag: 'payment img',
   url,
   data: { order_id, status: 'Waiting For Approval', msg: '' },
  });

  let update = await Order.updateOne(
   { store_id: req.store.id, order_id },
   {
    $set: {
     'amountPaid.status': 'Waiting For Approval',
    },
   }
  );

  return res.json({
   st: true,
  });
 } catch (error) {
  return res.json({ st: false });
 }
}
module.exports = uploadPayImg;
