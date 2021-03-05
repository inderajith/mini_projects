const mongoose = require('mongoose')

const userSchenma = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    interest:{
        type:String,
        required:true
    },
    wishlists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist'}]
})

module.exports = mongoose.model('User', userSchenma);

