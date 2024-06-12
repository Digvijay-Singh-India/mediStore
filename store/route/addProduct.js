const { Product, Order } = require('../../src/db');
const { idGenerator } = require('../../src/idGenerator');
async function addProduct(req, res, next) {
 //return res.json({ st: true });

 try {
  const {
   name = '',
   imgUrl = '',
   packSize = '',
   type = '',
   rx = '',
   sortCompo = '',
   mfgBy = '',
   sellingPrice = '',
   description = '',
   status = '',
  } = req.body;

  if (!name || !imgUrl || !packSize || !type || !sellingPrice || !status) {
   return res.json({ st: false, msg: 'some data is missing' });
  }

  const { productId = '' } = await idGenerator('productId');

  if (productId == '') {
   return res.json({ st: false, msg: 'Something is error.' });
  }
  let product = await Product.create({
   store_id: req.user.sid,
   sku_id: productId,
   name: name,
   image_url: imgUrl,
   pack_size_label: packSize,
   type: type,
   rx_required: rx,
   manufacturer_name: mfgBy,
   short_composition: sortCompo,
   description: description,
   price: sellingPrice,
   status: status,
  });
  if (product?.__v === 0) {
   return res.json({ st: true, productId, name });
  } else {
   return res, json({ st: false, msg: 'Something is error in product adding' });
  }
 } catch (error) {
  next(error);
 }
}
module.exports = addProduct;
