const express = require('express');

const user = express.Router();
// const storeAuth = require('../src/middlewares/storeAuth');
// r1.get('/', (req, res, next) => {
//  next();
// });

// const user = require('./src/express');
// const fun = require('../src/function');
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

const userLogin = require('./route/userLogin');
const passResetTokenVerify = require('./route/pass-reset-token-verify');
const passReset = require('./route/passReset');
const getProfile = require('./route/getProfile');
const addressCountry = require('./route/addressCountry');
const clintIndexedDb = require('./route/cdbProductName');
const getStore = require('./route/getStore');
const getPage = require('./route/getPage');
const getProduct = require('./route/getProduct');
const PrescriptionUpload = require('./route/prescriptionUpload');
// const express = require('express');

// account
user.get('/store', getStore);
user.get('/get-page', getPage);
user.get('/cdb-product-name', clintIndexedDb);
user.get('/address-country', addressCountry);

user.post('/register', userRegister);
user.post('/login', userLogin);

user.post('/forget-pass', (req, res) => {
 res.json({ st: true, res: { timer: 120, email: req.body.email } });
});
user.post('/reset-pass-token-verify', passResetTokenVerify);

user.post('/reset-pass', passReset);

user.get('/get-profile', getProfile);

user.post('/coupon-validator', couponValidate);

user.get('/search', searchProducts);

user.get('/get-product', getProduct);

user.post('/add-order', addOrder);
user.get('/get-orders', getOrders);
user.get('/get-order', getOrder);
user.post('/upload-payment-img', uploadPayImg);
user.get('/generate-pay-link', generatePayLink);
user.get('/payment-view', paymentView);
user.get('/get-transaction', getTransaction);

user.post('/prescription-upload', PrescriptionUpload);

user.get('/', (req, res) => {
 res.json({ message: 'Home Page' });
});

module.exports = user;
