const mongoose = require('mongoose')

const donorSchema = new mongoose.Schema({
    BloodDonorID:{
        type:String,
        required:true
    },
    DonorName:{
            type:String,
            required:true
    },
    ContactNumber:{
            type:String,
            required:true
    },
    Address:{
            type:String,
            required:true
    },
    ProjectID:{
        type:String,
        required:true
    }
})

mongoose.model("Donor",donorSchema)