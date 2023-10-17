const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true,'Product name must be provided'],
    },
    price: {
        type:Number,
        required:[true,'Price must be provided']
    },
    featured:{
        type:Boolean,
        default:false,
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createAt:{
        type:Date,
        default: Date.now()
    },
    company: {
        type:String,
        //Setting only sepecific options
        enum:{
            values: ['ikea','liddy','caressa','marcos'],
            message: '{VALUE is not supported',
        }
        // enum:['iqea','liddy','caressa','marcos']
    }
})

module.exports = mongoose.model('Product',productSchema);