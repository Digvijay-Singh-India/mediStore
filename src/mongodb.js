const {
 MongoClient
} = require('mongodb');


// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mediStore';

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to the MongoDB server
async function connect() {
 try {
  await client.connect();
  console.log('Connected to MongoDB server');
 } catch (err) {
  console.error('Error connecting to MongoDB:', err);
 }
}

// Call the connect function to establish a connection
connect();
const db = client.db(dbName);
module.exports= db; 