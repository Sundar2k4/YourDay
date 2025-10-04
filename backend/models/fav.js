const mongoose = require('mongoose');

const favschema = mongoose.Schema(
    {
        name:{type:String,required:true},
        items:{type:[String],required:true},
    }
)

module.exports = mongoose.model('fav',favschema);
