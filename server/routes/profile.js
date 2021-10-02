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

router.get('/allDonors',requireSignin, async (req,res)=>{
    try {
        const donors = await Donor.find();
        res.status(200).json(donors)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

router.put('/getPatient',requireSignin, (req,res)=>{ 
      Patient.findOne({ProjectID:req.body.ProjectID})
      .then(patient=>{
          console.log(patient)
          res.json(patient)
      }).catch(error=>{
          console.log(error)
      })
 })

 router.put('/getDonor',requireSignin, (req,res)=>{ 
    Donor.findOne({BloodDonorID:req.body.ProjectID})
    .then(donor=>{
        console.log(donor)
        res.json(donor)
    }).catch(error=>{
        console.log(error)
    })
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

router.put('/updateDonor',requireSignin, (req,res)=>{ 
    console.log(req.body)
      Donor.findOneAndUpdate({BloodDonorID:req.body.BloodDonorID},{
        DonorName:req.body.donorName,
        ContactNumber:req.body.contact,
        Address:req.body.address
      },{new:true})
      .exec((error,result)=>{
          if(error){
              return res.status(422).json({error:error})
          }else{
            res.json({message:"Updated Donor"})
          }
      })
    })

router.put('/updatePatient',requireSignin, (req,res)=>{ 
      Patient.findOneAndUpdate({ProjectID:req.body.ProjectID},{
        Hospital:req.body.hospital,
        PatientAge:req.body.patientAge,
        LastTransfusion:req.body.LastTransfusion,
        NextTransfusion:req.body.NextTransfusion
      },{new:true})
      .exec((error,result)=>{
        if(error){
            return res.status(422).json({error:error})
        }else{
          res.json({message:"Updated Patient"})
        }
    })
 })

 router.post('/addDonor',requireSignin,(req,res)=>{
    const { donorID, donorName, contact, address, projectId } = req.body
    if(!donorID || !donorName || !contact || !address || !projectId){
        return res.status(422).json({error:"please add all the fields"})
    }
    Donor.findOne({BloodDonorID:donorID})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Donor already exists"})
        }
            const donor = new Donor({
                BloodDonorID:donorID,
                DonorName:donorName,
                ContactNumber:contact,
                Address:address,
                ProjectID:projectId
            })
            donor.save()
            .then(donor=>{
                res.json({message:"saved successfully"})
            })
            .catch(error=>{
                console.log(error)
            })
    })
    .catch(error=>{
        console.log(error)
    }) 
})

 router.post('/addPatient',requireSignin,(req,res)=>{
    const {  patientProjectID, hospital, patientAge, gender, NOTRLY, LastTransfusion, NextTransfusion } = req.body
    if(!patientProjectID || !hospital || !patientAge || !gender || !NOTRLY || !LastTransfusion || !NextTransfusion){
        return res.status(422).json({error:"please add all the fields"})
    }
    Patient.findOne({ProjectID:patientProjectID})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Patient already exists"})
        }
            const patient = new Patient({
                ProjectID:patientProjectID,
                Hospital:hospital,
                PatientAge:patientAge,
                Sex:gender,
                NOTRLY:NOTRLY,
                LastTransfusion:LastTransfusion,
                NextTransfusion:NextTransfusion
            })
            patient.save()
            .then(donor=>{
                res.json({message:"saved successfully"})
            })
            .catch(error=>{
                console.log(error)
            })
    })
    .catch(error=>{
        console.log(error)
    }) 
})


module.exports = router