const mongoose = require('mongoose');
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const salt = bcrypt.genSaltSync(bcryptSalt);
const password= "123"
const hashPass = bcrypt.hashSync(password, salt);
    


const dbName = 'hackathon';
mongoose.connect(`mongodb://localhost/${dbName}`);

const adminDB =[{
  name: "admin",
  username: "arnold1@gmail.com",
  password: hashPass

 }]

Admin.create(adminDB, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${adminDB.length} admins`)
  mongoose.connection.close();
});