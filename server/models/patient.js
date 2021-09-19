const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    ProjectID:{
        type:String,
        unique:true,
        required:true
    },
    Hospital:{
            type:String,
            required:true
    },
    PatientAge:{
            type:String,
            required:true
    },
    Sex:{
            type:String,
            required:true
    },
    NOTRLY:{
            type:String,
            required:true
    },
    LastTransfusion:{
            type:String,
            required:true
    },
    NextTransfusion:{
            type:String,
            required:true
    }
})

mongoose.model("Patient",patientSchema)