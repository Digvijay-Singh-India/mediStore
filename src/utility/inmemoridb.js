const { Product } = require('../db');

const sift = require('sift');
const db = { product: [] };

async function n() {
 db.product = await Product.find();
 console.log(db.product.length);
}
n();

function find(collection, query, options = {}) {
 const { limit = db[collection].length, skip = 0 } = options;

 // Apply the query
 const filteredArray = db[collection].filter(sift(query));

 // Apply skip and limit
 const slicedArray = filteredArray.slice(skip, skip + limit);

 return slicedArray;
}

// Example array of objects
const myArray = [
 { name: 'John', age: 25 },
 { name: 'Alice', age: 30 },
 { name: 'Bob', age: 35 },
 { name: 'Charlie', age: 40 },
 { name: 'Eve', age: 45 },
];

// Example query
const query = { age: { $gte: 30 } }; // Find objects with age greater than or equal to 30

// Using find function with limit and skip
// let result = find(myArray, query, { limit: 20, skip: 0 });

// console.log(result);
// let result2 = find(myArray, query, { limit: 20, skip: 0 });

// console.log(result2);
// Output:
// [ { name: 'Bob', age: 35 }, { name: 'Charlie', age: 40 } ]

module.exports = { find: find };
