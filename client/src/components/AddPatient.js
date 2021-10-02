import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

function AddPatient() {
    const [patientProjectID, setPatientProjectId] = useState("")
    const [hospital, setHospital] = useState("")
    const [patientAge, setPatientAge] = useState("")
    const [gender, setGender] = useState("")
    const [NOTRLY, setNOTRLY] = useState("")
    const [LastTransfusion, setlastTransfusion] = useState("")
    const [NextTransfusion, setNextTransfusion] = useState("")
    const history = useHistory()
    const addPatient = ()=>{
        fetch("/addPatient",{
            method:"post",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                patientProjectID,
                hospital,
                patientAge,
                gender,
                NOTRLY,
                LastTransfusion,
                NextTransfusion
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: "Patient Added Successfully", classes:"#43a047 green darken-1"})
                history.push('/profile')
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className="container">
            <div style={{padding:"2.5%"}} className="card">
            <input 
                        placeholder="Project ID" 
                        type="text" 
                        value={patientProjectID}
                        onChange={(e)=>{
                            setPatientProjectId(e.target.value)
                        }}
                        />
                        <input 
                        placeholder="Hospital" 
                        type="text"
                        value={hospital}
                        onChange={(e)=>{
                            setHospital(e.target.value)
                        }}
                        />
                        <input 
                        placeholder="Patient Age" 
                        type="text"
                        value={patientAge}
                        onChange={(e)=>{
                            setPatientAge(e.target.value)
                        }}
                        />
                        <input 
                        placeholder="Gender" 
                        type="text"
                        value={gender}
                        onChange={(e)=>{
                            setGender(e.target.value)
                        }}
                        />
                        <input 
                        placeholder="No. of transfusions needed last year" 
                        type="text"
                        value={NOTRLY}
                        onChange={(e)=>{
                            setNOTRLY(e.target.value)
                        }}
                        />
                        <input 
                        placeholder="Last Transfusion" 
                        type="text"
                        value={LastTransfusion}
                        onChange={(e)=>{
                            setlastTransfusion(e.target.value)
                        }}
                        />
                        <input 
                        placeholder="Next Transfusion" 
                        type="text"
                        value={NextTransfusion}
                        onChange={(e)=>{
                            setNextTransfusion(e.target.value)
                        }}
                        />
                        <button className="waves-effect waves-light btn large-btn"
                        onClick={()=>addPatient()}
                        >
                            
                            Add patient
                        </button>
            </div>
            
        </div>
    )
}

export default AddPatient
