const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const adminSchema = new Schema({
 name: {type:String,unique:true},
 username: {type:String,unique:true},
 password: String

});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;