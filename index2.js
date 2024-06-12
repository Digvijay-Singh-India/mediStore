const app = require('./src/express');
const fun = require('./src/function');
const userRegister = require('./route/userRegister');
const searchProducts = require('./route/searchProducts');
const addOrder = require('./route/add-order');
const getOrders = require('./route/get-orders');
const getOrder = require('./route/get-order');
const uploadPayImg = require('./route/uploadPayImg');
const couponValidate = require('./route/couponValidate');
const generatePayLink = require('./route/generatePayLink');
const paymentView = require('./route/paymentView');
const getTransaction = require('./route/get-transaction');
const { Product } = require('./src/db');
const userLogin = require('./route/userLogin');
const passResetTokenVerify = require('./route/pass-reset-token-verify');
const passReset = require('./route/passReset');
const getProfile = require('./route/getProfile');
const addressCountry = require('./route/addressCountry');
const clintIndexedDb = require('./route/cdbProductName');

//order / get - orders

//account

app.get('/cdb-product-name', clintIndexedDb);
app.get('/address-country', addressCountry);

app.post('/user/register', userRegister);
app.post('/user/login', userLogin);
app.post('/user/forget-pass', (req, res) => {
 res.json({ st: true, res: { timer: 120, email: req.body.email } });
});
app.post('/user/reset-pass-token-verify', passResetTokenVerify);

app.post('/user/reset-pass', passReset);

app.post('/user/get-profile', getProfile);

app.post('/user/coupon-validator', couponValidate);

//app
app.get('/search', searchProducts);
//order
app.post('/order/add-order', addOrder);
app.get('/order/get-orders', getOrders);
app.get('/order/get-order', getOrder);
app.post('/order/upload-payment-img', uploadPayImg);
app.get('/order/generate-pay-link', generatePayLink);
app.get('/order/payment-view', paymentView);
app.get('/order/get-transaction', getTransaction);

app.get('/', (req, res) => {
 res.json({
  message: 'Home Page',
 });
});

app.use((err, req, res, next) => {
 // Your error handling logic
 console.log(err);
 res.status(500).json({ error: err.message || 'Internal Server Error' });
});

//kkjhk

//const query = { store_id: 'S2024001', name: { $regex: /^a/i } }; // { store_id: 'S2024001' }
// const query = { age: { $gte: 30 } };
// setTimeout(() => {
//  console.log(find('product', query, { skip: 0 }).length);
// }, 3000);
