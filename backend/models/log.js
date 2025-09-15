const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const usermodel = new mongoose.Schema({
    email : {type:String,required:true},
    password:{type:String,required:true},
})

usermodel.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10);
    next();
})

module.exports = mongoose.model('log',usermodel);