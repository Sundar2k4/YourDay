const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
     event:{type:String,required:true
     },
     date:{type:Date,required:true},
     person:{type:String,required:true},
})


module.exports = mongoose.model('home',homeSchema);


