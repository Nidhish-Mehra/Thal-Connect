const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Operator = mongoose.model("Operator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../keys')

router.post('/signup',(req,res)=>{
    const { userName, password } = req.body
    if(!userName || !password){
        return res.status(422).json({error:"please add all the fields"})
    }
    Operator.findOne({userName:userName})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const operator = new Operator({
                userName,
                password:hashedpassword
            })
            operator.save()
            .then(operator=>{
                res.json({message:"saved successfully"})
            })
            .catch(error=>{
                console.log(error)
            })
        })
    })
    .catch(error=>{
        console.log(error)
    }) 
})

router.post('/signin',(req,res)=>{
    const { userName,password } = req.body
    if( !userName || !password ){
        return res.status(422).json({error:"Please enter User Name and Password"})
    }
    Operator.findOne({userName:userName})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Mobile Number or Password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(Matched=>{
            if(Matched){
                // res.json({message:"successfully signed in"})
                const token =jwt.sign({_id:savedUser._id},JWT_KEY)
                const { _id,userName } = savedUser
                res.json({token,user:{_id,userName}})
            }
            else{
                return res.status(422).json({error:"Invalid User Name or Password"})
            }
        })
        .catch(error=>{
            console.log(error)
        })
    })
})


module.exports = router