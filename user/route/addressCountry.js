const { readFileSync, writeFileSync } = require('node:fs');
const { Product, copy } = require('../../src/db');

const AddressCountryFile = JSON.parse(
 readFileSync('assets/json/stateDistrict.json', 'utf8')
);

function addressCountry(req, res, next) {
 res.json({ st: true, res: AddressCountryFile });
}
module.exports = addressCountry;
