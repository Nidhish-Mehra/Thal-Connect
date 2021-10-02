import React,{useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import M from 'materialize-css'

function EditPatient() {
    const {id} = useParams()
    const [patientProjectID, setPatientProjectId] = useState("")
    const [hospital, setHospital] = useState("")
    const [patientAge, setPatientAge] = useState("")
    const [gender, setGender] = useState("")
    const [NOTRLY, setNOTRLY] = useState("")
    const [LastTransfusion, setlastTransfusion] = useState("")
    const [NextTransfusion, setNextTransfusion] = useState("")
    const [data, setData] = useState("")

    const updatePatient = ()=>{
        fetch('/updatePatient', {
            method: "put",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                ProjectID:id,
                hospital,
                patientAge,
                LastTransfusion,
                NextTransfusion
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }else{
                M.toast({html:data.message, classes:"#43a047 green darken-1"})
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    const getUser = ()=> {
        fetch('/getPatient', {
            method: "put",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                ProjectID:id
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }else{
                setData(data)
                console.log(data)
                setHospital(data.hospital)
                setPatientAge(data.PatientAge)
                setlastTransfusion(data.LastTransfusion)
                setNextTransfusion(data.NextTransfusion)
                console.log("this is executed")
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getUser()
    },[])
    return (
        <div className="container">
            <div style={{padding:"5px"}} className="card">
                <div style={{textAlign:'center'}}>
                <p>{data.ProjectID}</p>
                </div>
                
                <div className="row">
                    <div className="col s6">
                        <p>Current Hospital: {data.Hospital}</p>
                        <p>Current Age: {data.PatientAge}</p>
                        <p>LastTransfusion: {data.LastTransfusion}</p>
                        <p>NextTransfusion: {data.NextTransfusion}</p>
                    </div>
                    <div className="col s6">
                    <input 
                        placeholder="Update Hospital" 
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
                    </div>
                </div>
                        
                        

                         
                        <button className="waves-effect waves-light btn large-btn"
                        onClick={()=>updatePatient()}
                        >
                            
                            Update patient
                        </button>
            </div>
        </div>
    )
}

export default EditPatient
