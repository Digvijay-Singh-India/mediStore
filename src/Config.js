const dotenv = require('dotenv');
dotenv.config();

const __myConfig = {
 website: process.env.WEBSITE,
 mongo_connection_string: process.env.MONGO_CONNECTION_STRING,
 node_env: process.env.NODE_ENV,
 cryptoKey: process.env.CRYPTO_KEY,
 assetsUrl: process.env.ASSETS_URL,
 node_env: process.env.NODE_ENV,
};
Object.freeze(__myConfig);

function get(key) {
 return __myConfig[key];
}
const config = {
 get,
};
module.exports = Object.freeze(config);
