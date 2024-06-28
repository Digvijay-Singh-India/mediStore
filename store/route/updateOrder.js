const fs = require('fs');

const { Order, Image, Product } = require('../../src/db');
const { trusted } = require('mongoose');
const { Image } = require('../../src/db');
//const {Image }= require('../../src/db');

async function updateOrder(req, res, next) {
 //console.log(req.body);
 try {
  const { type } = req.body;
  res.json({ st: true });
  let result = '';
  switch (type) {
   case 'paymentScreenShort':
    result = await Image.updateOne();

    break;

   default:
    break;
  }
 } catch (error) {
  next(error);
  //return res.json({ st: false });
 }
}
module.exports = updateOrder;
