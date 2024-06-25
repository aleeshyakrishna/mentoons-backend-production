const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String, // Corrected from 'string' to 'String'
    required: false,
  },
  productCategory: {
    type: String,
    required: true,
  },
  ageCategory: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  free: {
    type: Boolean,
  },
  thumbnail: {
    type: String, // Corrected from 'string' to 'String'
  },
  source:{
    type:String
  }

});

module.exports = mongoose.model('product', productSchema);
