const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const clientSchema = new Schema({
 name: String,
 email: String,
 category: String
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;