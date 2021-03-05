const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    id:String,
    date:String,
    time:String,
    title:String,
    description:String,
    from:String,
    address:String,
    name:String,
    urlID:String,
    latitude:Number,
    longitude:Number
})

module.exports = mongoose.model('Wishlist', wishlistSchema);