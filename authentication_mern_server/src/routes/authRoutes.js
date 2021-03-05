const express = require('express')
const authrouter = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

authrouter.post('/signin', (req, res) => {
    let {email, password} = req.body
    
    User.find({email})
        .then((fetchedData) => {            
            return bcrypt.compare(password, fetchedData[0].password)    
        })
        .then((result) => {
            if(result){
                res.status(200).json({msg:'signin succesfully', mailID:email, verified:true})
            }
            
                res.status(404).json({msg:'signin failed', verified:false})
                
        })
        .catch((err) => {
                console.log('err in signin: ', err);            
                res.status(404).json({msg:'signin failed', verified:false})
              })   
})

authrouter.post('/signup', (req, res) => {
    let {username,email,  password, interest} =  req.body
    
    bcrypt.hash(password, 12)
          .then((hashedPassword) => {              
            const user = new User({username,email, password:hashedPassword, interest})
            return user.save()
          })
          .then(() => {
                res.status(200).json({msg:'signup sucessfull', verified:true})
          })
          .catch((err) => {
              console.log('err authrroutes signup: ', err);
              res.status(404).json({msg:'signup failed', verified:false})
          })
    
})

authrouter.post('/verify', (req, res) => {
    let {email} = req.body 
    User.find({email}).exec((err, fetchedData) => {
        if(err){
            res.status(404).json({msg:'signup failed', verified:false})
        }
    })
})


authrouter.get('/settings/:emailID', (req, res) => {
    const email = req.params.emailID 

    User.find({email}).exec((err, fetchedData) => {
        if(err){
            console.log('err getting profile  : ', err);
            res.status(404).json({msg:'profile fetching failed'})
        }        
        console.log('fetchedData: ', fetchedData);
        res.status(200).json({msg:'profile fetching sucessfully', profileData:fetchedData})
        



    })
})
authrouter.put('/settings/:emailID', (req, res) => {
    const email = req.params.emailID 
    const {interest, username} = req.body

    User.updateMany({email}, {interest, username}).exec((err, fetchedData) => {
        if(err){
            console.log('err profile updation : ', err);
            res.status(404).json({msg:'profile updation failed'})
        }        
        console.log('fetchedData: ', fetchedData);
        res.status(200).json({msg:'profile updated sucessfully'})
        



    })
})


authrouter.post('/settings/changepassword', (req, res) => {
    const {oldPassword, newPassword, myEmail} = req.body 

    User.find({email:myEmail}).exec((err, fetchedData) => {
        if(err){
            console.log('err change password server : ', err);
            res.status(404).json({msg:'change password failed'})
        } 
        bcrypt.compare(oldPassword, fetchedData[0].password)
                .then((result) => {
                  console.log('oldPassword: ', oldPassword);
                  if(result){
                    bcrypt.hash(newPassword, 12)
                          .then((hashedPassword) => {
                                fetchedData[0].password = hashedPassword
                                fetchedData[0].save((err) => {
                                    if(err){
                                        console.log('err change password after bcrypt server : ', err);
                                        res.status(404).json({msg:'change password failed'})
                                    } 
                                    res.status(200).json({msg:'succesfully changed the password'})
                                })

                        })
                  }
                  else{
                    res.status(404).json({msg:'change password failed'})
                  }
              })        
              .catch((err) => {
                  console.log('err in change password server compare: ', err)
                  res.status(404).json({msg:'change password failed'})
              })
    })

})


module.exports = authrouter

