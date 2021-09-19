const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Operator = mongoose.model("Operator")
const Patient = mongoose.model("Patient")
const Donor = mongoose.model("Donor")
const requireSignin = require('../middleware/requireSignin')
const csv=require('csvtojson')

router.post('/upload',requireSignin,(req,res)=>{
    if(req.files === null){
        return res.status(400).json({ message: "No file was uploaded"})
    }
    var duplicate = 0;
    const file = req.files.file;
    const name = file.name
    file.mv(`F:/react projects/impact a billion/Thal-connect/client/public/uploads/${name}`)
    const path = `F:/react projects/impact a billion/Thal-connect/client/public/uploads/${name}`
    console.log("file uploaded")
    console.log(file)
    console.log(name)
    res.json({message:"file uploaded"})
    csv()
    .fromFile(path)
    .then((jsonObj)=>{
        jsonObj.map((item)=>{
            Patient.find({ProjectID:item.ProjectID})
            .then(existingPatient=>{
                if(existingPatient.length!=0){
                   duplicate++ 
                }else{
                    const patient = new Patient({
                        ProjectID:item.ProjectID,
                        Hospital:item.Hospital,
                        PatientAge:item.PatientAge,
                        Sex:item.Sex,
                        NOTRLY:item.NOTRLY,
                        LastTransfusion:item.LastTransfusion,
                        NextTransfusion:item.NextTransfusion
                    })
                    patient.save()
                    .catch(error=>{
                        console.log(error)
                    })
                }
            })
            Donor.find({BloodDonorID:item.BloodDonorID})
            .then(existingDonor=>{
                if(existingDonor.length!=0){
                   duplicate++ 
                }else{
                    const donor = new Donor({
                        BloodDonorID:item.BloodDonorID,
                        DonorName:item.DonorName,
                        ContactNumber:item.ContactNumber,
                        Address:item.Address,
                        ProjectID:item.ProjectID
                    })
                    donor.save()
                    .catch(error=>{
                        console.log(error)
                    })
                }
            })

        })
    })
    console.log(duplicate)
})

router.get('/allPatients',requireSignin, async (req,res)=>{
    try {
        const patients = await Patient.find();
        res.status(200).json(patients)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

router.post('/filteredPatient',requireSignin, async (req,res)=>{
    const { type } = req.body
    try {
        const patients = await Patient.find({hospital:type});
        res.status(200).json(patients)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

router.put('/donorlist',requireSignin, (req,res)=>{ 
      Donor.find({ProjectID:req.body.ProjectId})
      .then(donors=>{
          console.log({donors})
          res.json({donors})
      }).catch(error=>{
          console.log(error)
      })
 })

module.exports = router