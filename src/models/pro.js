const mongoose = require("mongoose");

const proSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  product_catagory: {
    type: String,
  },
  product_manufacturing_date: {
    type: String,
  },
  product_cost: {
    type: String,
  },
  product_description: {
    type: String,
     
  },
  product_image:{
    type: String,
  }
});

const Product = new mongoose.model("Product", proSchema)

module.exports = Product;