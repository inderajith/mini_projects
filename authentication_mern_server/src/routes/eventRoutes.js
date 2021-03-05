const express = require('express')
const eventrouter = express.Router()
const Wishlist  = require('../models/Wishlist')
const User = require('../models/User')

eventrouter.post('/wishlist', (req, res) => {
    const {date, time, title, description, from, address, name, id, myEmail, urlID, latitude, longitude} = req.body    

    User.find({email:myEmail}).populate('wishlists').exec((err, fetchedData) => {
        if(err){
            console.log('err in adding wishlist eventroutes: ', err)            
            res.status(404).json({msg:'Failed to add in wishlist. Try again Later!', action:false})
        }
        else{             
            const arrayID = []
            fetchedData[0].wishlists.map(item => arrayID.push(item.urlID))
            if(arrayID.includes(urlID))
            {
                res.status(200).json({msg:'Already added to wishlist', action:true})
            }
            else{
                const wish = new Wishlist({date, time, title, description, from, address, name, urlID, latitude, longitude})
                wish.save()
                .then(() => {
                    fetchedData[0].wishlists.push(wish)
                    return fetchedData[0].save()
                })
                .then(() => {                    
                    res.status(200).json({msg:'Successfully added to wishlist', action:true})
                 })
                .catch((err) => {
                    console.log('err in wishlist saving to database', err)
                    res.status(404).json({msg:'Failed to add in wishlist. Try again Later!', action:false})
                })
            }
        }
    })


})

eventrouter.get('/wishlist/:mailID',(req,res)=>{
    const email = req.params.mailID
    User.find({email}).populate('wishlists').exec((err,data)=>{
        if(err){
            console.log('err in fetching: ', err)
            res.send('error in fetching')
        }
        else{                                                
            res.status(200).json({wishlists:data[0].wishlists})
        }
       
    })
    

})
eventrouter.delete('/wishlist/:mailid/:wishlistId',(req,res)=>{

    const _id = req.params.wishlistId
    const email = req.params.mailid 
    Wishlist.findByIdAndDelete({_id}).exec((err, response) => {
        if(err){
            console.log('err in deleting: ', err)
            res.send('error in deleting')
        }
        else{
            User.find({email}).exec((err, fetchedData) => {                
                let newarr = fetchedData[0].wishlists.filter(item => item!= _id)
                console.log('newarr: ', newarr);
                fetchedData[0].wishlists = newarr 
                fetchedData[0].save()
                             .then(() => {
                                res.status(200).json({msg:'Successfully deleted from wishlist', action:true})                                                        
                             })
                             .catch((err) => {
                                res.status(404).json({msg:'Failed to delete from wishlist. Try again Later!', action:false})
                             })
            })
        }
    })
    

})


module.exports = eventrouter