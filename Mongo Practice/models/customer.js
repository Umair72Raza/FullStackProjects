const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: String,
        required: true
    }],
    address:{
        street:{
            type:String,
            required: true
        },
        block:{
            type:String,
            required:true
        },
        state:{
            type: String,
            required: true
        }
    }

})

const customInfo = mongoose.model("Logintest", customerSchema)

module.exports = customInfo;