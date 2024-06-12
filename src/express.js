// index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const http = require('http');
// const {
//  createServer
// } = require('http');
const https = require('https');

// Import the cors middleware
// const storeAuth = require('./middlewares/storeAuth');
const { default: rateLimit } = require('express-rate-limit');

// var options = {
//  key: fs.readFileSync('/home/mint/Documents/https_ssl.key'),
//  cert: fs.readFileSync('/home/mint/Documents/https_ssl.crt'),
// };
const port = process.env.PORT || 3000;

// const server = http.createServer(options, app);

const app = express();
const server = http.createServer(app);
// const server = http.createServer(options, app);
const limiter = rateLimit({
 windowMs: 1000,
 max: 20,
 message: 'Too many connections, please try again later',
 standardHeaders: false,
 legacyHeaders: false,
});

// Enable all CORS requestsconsole.log(app);

// var whitelist = ['http://example1.com', 'http://example2.com'];
// var corsOptions = {
//  origin: function (origin, callback) {
//   console.log(origin);

//   if (whitelist.indexOf(origin) !== -1) {
//    callback(null, true);
//   } else {
//    callback(new Error('Not allowed by CORS'));
//   }
//  },
// };

let corsObj = {
 // origin: function (origin, callback) {
 //  console.log(origin);
 //  callback(null, true);
 // },
 origin: '*',
 credentials: false,
};

app.options('*', cors(corsObj));
app.use(cors(corsObj));
app.use(limiter);
// app.use((req, res, next) => {
//  console.log(req);
//  next();
// });
// app.options('*', cors(corsObj));
// app.use('*', cors(corsObj));

app.use(
 express.json({
  limit: '100mb',
 })
);
const g = [];
app.use((req, res, next) => {
 // g.push({ header: 'headers' });
 const fs = require('fs');
 const assess = {
  url: req.hostname + req.url,
  method: req.method,
  header: req.headers,
  body: req.body,
 };
 // fs.appendFile('kkk.json', JSON.stringify(asess) + '\n', (e, r) => {});
 // console.log(g.length, g);
 next();
 //res.json({ st: false });
});
const TIMEOUT = 30000;
app.use((req, res, next) => {
 req.setTimeout(TIMEOUT, () => {
  const err = new Error('Request Timeout');
  err.status = 408;
  next(err);
 });
 next();
});

app.use(express.static('assets'));
// app.use(storeAuth);

// app.use(
//  express.json({
//   limit: '100mb',
//  })
// );

// Your routes

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
 if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
  // Handle JSON parsing error
  res.status(400).json({ error: 'Invalid JSON' });
 } else {
  // Pass the error to the next middleware
  next(err);
 }
});

// Other error handling middleware
// app.use((err, req, res, next) => {
//  // Your error handling logic
//  res.status(500).json({ error: 'Internal Server Error' });
// });

let host = '192.168.43.67:3000';

// Start the server,host
server.listen(() => {
 console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;
