const fs = require('fs');

const Config = require('../../src/Config');
// const { Product } = require('../../src/db');
const processImage = require('../../src/utility/processImage');
const cloudinaryUpload = require('../../src/utility/cloudinaryUpload');

async function PrescriptionUpload(req, res, next) {
 try {
  const dataURL = req.body.data;
  const uid = req.body.uid;
  //const order_id = req.body.order_id;

  const matches = dataURL.match(/^data:image\/(png|jpeg|jpg|webp);base64,/);
  const extension = matches ? matches[1] : null;

  let base64String = dataURL.split(',')[1];

  let url = uid + '-' + new Date().getTime() + '.' + 'webp';
  // let url = productId + '-' + new Date().getTime() + '.' + extension;

  const filePath = 'assets/img/prescription/' + url;

  const binaryData = Buffer.from(base64String, 'base64');

  //fs.writeFileSync(filePath, binaryData);

  let h = await processImage({
   inputPath: binaryData,
   outputPath: filePath,
   // width: 300,
   // height: 200,
  });
  console.log(h);

  let uploaded = await cloudinaryUpload(filePath, 'prescription');

  const imgUrl =
   uploaded || Config.get('assetsUrl') + 'img/prescription/' + url;
  // const imgUrl = Config.get('assetsUrl') + 'img/product/' + url;

  // if (productId) {
  //  let update = await Product.updateOne(
  //   { store_id: req.user.sid, sku_id: productId },
  //   {
  //    $set: {
  //     image_url: imgUrl,
  //    },
  //   }
  //  );
  // }
  /*
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
*/
  return res.json({
   st: true,
   res: imgUrl,
  });
 } catch (error) {
  next(error);
  //return res.json({ st: false });
 }
}
module.exports = PrescriptionUpload;
