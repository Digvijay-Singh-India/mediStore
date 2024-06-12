const fs = require('fs');

const { Order, Image, Product } = require('../../src/db');
const { trusted } = require('mongoose');
//const {Image }= require('../../src/db');

async function updateProduct(req, res, next) {
 //console.log(req.body);
 try {
  let updateFiled = {};
  let productId = '';
  let de = false;
  req.body.map((e) => {
   //console.log(e);
   if (e.productId) {
    productId = e.productId;
   }
   switch (e.f) {
    case 'description':
     updateFiled.description = e.d;
     break;
    case 'sellingPrice':
     updateFiled.price = e.d;
     break;
    case 'status':
     updateFiled.status = e.d;
     break;
    case 'name':
     updateFiled.name = e.d;
     break;
    case 'packSize':
     updateFiled.pack_size_label = e.d;
     break;
    case 'type':
     updateFiled.type = e.d;
     break;
    case 'rx':
     updateFiled.rx_required = e.d;
     break;
    case 'sortCompo':
     updateFiled.short_composition = e.d;
     break;
    case 'mfgBy':
     updateFiled.manufacturer_name = e.d;
     break;
    case 'delete':
     de = true;
     break;
    //  case 'value':
    //   break;

    default:
     break;
   }
  });
  console.log(updateFiled);

  if (!productId) {
   return res.json({ st: false, msg: 'Product id not found' });
  }

  if (de === true) {
   let deleteProduct = await Product.deleteOne({
    store_id: req.user.sid,
    sku_id: productId,
   });

   console.log(deleteProduct);
   if (deleteProduct.acknowledged) {
    return res.json({ st: true, delete: true });
   } else {
    return res.json({
     st: false,
    });
   }
  }

  //return res.json({ st: true });
  let update = await Product.updateOne(
   { store_id: req.user.sid, sku_id: productId },
   {
    $set: updateFiled,
   }
  );
  console.log(update);
  if (update.acknowledged) {
   return res.json({ st: true });
  } else {
   return res.json({
    st: false,
   });
  }
 } catch (error) {
  next(error);
  //return res.json({ st: false });
 }
}
module.exports = updateProduct;
