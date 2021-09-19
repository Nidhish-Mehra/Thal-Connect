const mongoose = require('mongoose')

const operatorSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
            type:String,
            required:true
    }
})

mongoose.model("Operator",operatorSchema)