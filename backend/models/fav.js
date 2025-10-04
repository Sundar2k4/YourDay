const mongoose = require('mongoose');

const favschema = mongoose.Schema(
    {
        email:{type:String,required:true},
        name:{type:String,required:true},
        items:{type:[String],required:true},
    }
)

module.exports = mongoose.model('fav',favschema);
