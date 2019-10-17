const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    name: String,
    description: String,
    category: String,
    price: Number,
    calories: Number,
    peso: Number,
    image: String
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", productsSchema);
module.exports = Products;
