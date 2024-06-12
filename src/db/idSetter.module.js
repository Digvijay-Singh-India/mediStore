const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const idSetterSchema = new Schema({
 store_id: Number,
 user_id: Number,
 productId: Number,
});

const idSetter = mongoose.model('idSetters', idSetterSchema);

module.exports = idSetter;
