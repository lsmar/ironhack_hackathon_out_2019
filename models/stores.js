const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const storesSchema = new Schema({
 name: String,
 address: { type: { type: String }, coordinates: [Number] },
 deliveryRadius: { type: { type: String }, coordinates: [Number] }
});
storesSchema.index({ location: '2dsphere' });

const Stores = mongoose.model("Stores", storesSchema);
module.exports = Stores;