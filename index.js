const app = require('./src/express');
const userRoute = require('./user');
const storeRoute = require('./store');
const storeAuth = require('./src/middlewares/storeAuth');

app.get('/', (req, res) => {
 res.json({
  message: 'Home Page',
 });
});
app.use('/user', storeAuth);
app.use('/user', userRoute);
app.use('/store', storeRoute);

app.use((err, req, res, next) => {
 // Your error handling logic
 console.log(err);
 res.status(500).json({ error: err.message || 'Internal Server Error' });
});
