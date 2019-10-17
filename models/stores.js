const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: { type: String }, coordinates: [Number] },
    deliveryRadius: { type: { type: String }, coordinates: [Number] }
  },
  { timestamps: true }
);
storesSchema.index({ location: "2dsphere" });

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
