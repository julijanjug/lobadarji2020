const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() },
  available: { type: Boolean, required: true },
  price: { type: Number, required: true },
}, { read: 'secondary' });

module.exports = mongoose.model('products', productSchema);
