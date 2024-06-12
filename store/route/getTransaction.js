const { Payment } = require('../../src/db');

function getTransaction(req, res) {
 const { id = '', uid = '' } = req.query;

 try {
  let results = [
   {
    order_id: '6757',
    transaction_id: '8688',
    amount: '77',
    method: 'UPI',
    status: 'pending',
    note: 'note',
    date: new Date(),
   },
   {
    order_id: '6757',
    transaction_id: '86886765',
    amount: '77',
    method: 'UPI',
    status: 'completed',
    note: 'note',
    date: new Date(),
   },
  ];

  res.json({ st: true, res: results });
 } catch (error) {
  console.log(error);
  return res.json({ st: false, msg: 'Something is error' });
 }
}

module.exports = getTransaction;
