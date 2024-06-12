const express = require('express');

const store = express.Router();
const register = require('./route/register');
const searchProducts = require('./route/searchProducts');
const addOrder = require('./route/addOrder');
const getOrders = require('./route/getOrders');
const getOrder = require('./route/getOrder');
const uploadPayImg = require('./route/uploadPayImg');
const couponValidate = require('./route/couponValidate');
const generatePayLink = require('./route/generatePayLink');
const paymentView = require('./route/paymentView');
const getTransaction = require('./route/getTransaction');

const login = require('./route/login');
const passResetTokenVerify = require('./route/pass-reset-token-verify');
const passReset = require('./route/passReset');
const getProfile = require('./route/getProfile');
const addressCountry = require('./route/addressCountry');
const indexedDb = require('./route/indexedDb');
const storeSetup = require('./route/storeSetup');
const userAuth = require('../src/middlewares/userAuth');
const getStore = require('./route/getStore');
const homeDashboard = require('./route/homeDashboard');
const addProduct = require('./route/addProduct');
const getProducts = require('./route/getProducts');
const getProduct = require('./route/getProduct');
const updateProduct = require('./route/updateProduct');

const getCustomers = require('./route/getCustomers');
const getCustomer = require('./route/getCustomer');

const memoDb = require('../src/utility/memoDb');
const uploadProductImg = require('./route/uploadProductImage');

store.post('/indexeddb', userAuth, indexedDb);

store.get('/get-manufactures', userAuth, (req, res) => {
 res.json({ st: true, res: memoDb.get('mfg') });
});
store.get('/get-pack-sizes', userAuth, (req, res) => {
 res.json({ st: true, res: memoDb.get('packSize') });
});

store.post('/register', register);

store.post('/login', login);

store.post('/forget-pass', (req, res) => {
 res.json({ st: true, res: { timer: 120, email: req.body.email } });
});
store.post('/reset-pass-token-verify', passResetTokenVerify);

store.post('/reset-pass', passReset);

store.post('/get-profile', getProfile);

store.post('/store-setup', userAuth, storeSetup);

store.get('/get-store', userAuth, getStore);

store.get('/home-dashboard', userAuth, homeDashboard);

store.post('/add-product', userAuth, addProduct);

store.post('/upload-product-image', userAuth, uploadProductImg);

store.get('/get-products', userAuth, getProducts);

store.get('/get-product', userAuth, getProduct);

store.post('/update-product', userAuth, updateProduct);

store.get('/get-customers', userAuth, getCustomers);

store.get('/get-customer', userAuth, getCustomer);

store.get('/home-dashboard', userAuth, homeDashboard);

store.post('/coupon-validator', couponValidate);

store.get('/search', searchProducts);
store.post('/add-order', addOrder);
store.get('/get-orders', userAuth, getOrders);
store.get('/get-order', userAuth, getOrder);
store.post('/upload-payment-img', uploadPayImg);
store.get('/generate-pay-link', generatePayLink);
store.get('/payment-view', paymentView);
store.get('/get-transaction', getTransaction);

store.get('/', (req, res) => {
 res.json({
  message: 'Home Page',
 });
});

module.exports = store;
