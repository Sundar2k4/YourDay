const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
     event:{type:String,required:true
     },
     date:{type:Date,required:true},
     person:{type:String,required:true},
     user :{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
})


module.exports = mongoose.model('home',homeSchema);


