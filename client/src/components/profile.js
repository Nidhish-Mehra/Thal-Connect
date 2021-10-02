import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import M from 'materialize-css'

const axios = require("axios")

function Profile() {
    const [user, setUser] = useState([])
    const [file, setFile] = useState("")
    const [donorID, setDonorId] = useState("")
    const [donorName, setDonorName] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [projectId, setProjectId] = useState("")
    const [patientProjectID, setPatientProjectId] = useState("")
    const [hospital, setHospital] = useState("")
    const [patientAge, setPatientAge] = useState("")
    const [gender, setGender] = useState("")
    const [NOTRLY, setNOTRLY] = useState("")
    const [LastTransfusion, setlastTransfusion] = useState("")
    const [NextTransfusion, setNextTransfusion] = useState("")
    const history = useHistory()

    useEffect(()=>{
        M.AutoInit()
    },[])

    // const addDonor = ()=>{
    //     fetch("/addDonor",{
    //         method:"post",
    //         headers:{
    //             "Authorization":"Bearer "+localStorage.getItem("jwt"),
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             donorID,
    //             donorName,
    //             contact,
    //             address,
    //             projectId
    //         })
    //     }).then(res=>res.json())
    //     .then(data=>{
    //         if(data.error){
    //             M.toast({html:data.error, classes:"#c62828 red darken-3"})
    //         }
    //         else{
    //             M.toast({html: "Donor Added Successfully", classes:"#43a047 green darken-1"})
    //             history.push('/profile')
    //         }
    //     }).catch(error=>{
    //         console.log(error)
    //     })
    // }
    // const addPatient = ()=>{
    //     fetch("/addPatient",{
    //         method:"post",
    //         headers:{
    //             "Authorization":"Bearer "+localStorage.getItem("jwt"),
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             patientProjectID,
    //             hospital,
    //             patientAge,
    //             gender,
    //             NOTRLY,
    //             LastTransfusion,
    //             NextTransfusion
    //         })
    //     }).then(res=>res.json())
    //     .then(data=>{
    //         if(data.error){
    //             M.toast({html:data.error, classes:"#c62828 red darken-3"})
    //         }
    //         else{
    //             M.toast({html: "Patient Added Successfully", classes:"#43a047 green darken-1"})
    //             history.push('/profile')
    //         }
    //     }).catch(error=>{
    //         console.log(error)
    //     })
    // }


    const onSubmit = async e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);

        try{
            const res = await axios.post('/upload',formData,{
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt"),
                    'Content-Type':'multipart/form-data'
                }
            });
            const { message } = res.data
        }catch(err){
            console.log("something went wrong")
        }
    }

    return (
        <>
        <div  className="container row">
            <form
            style={{ padding: '10px' , textAlign: 'center'}}
            className="col s6 card offset-s3" onSubmit={onSubmit}>
                <div class="file-field input-field">
                <div class="btn">
                    <span>File</span>
                    <input 
                    type="file" 
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(e)=>setFile(e.target.files[0]) }
                    />
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text"/>
                </div>
                </div>
                <br/>
                    <input 
                    type="submit"
                    className="waves-effect waves-light btn large-btn white-text right"
                    >
                    </input>
            </form><br/>


            {/* <div className="card col s6" style={{ padding: '10px' , textAlign: 'center'}}>
            <div class="row">
                <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s6"><a href="#test1">Add Donor</a></li>
                    <li class="tab col s6"><a class="active" href="#test2">Add patient</a></li>
                </ul>
                </div>
                <div id="test1" class="col s12">
                            <input 
                        placeholder="Donor ID" 
                        type="text" 
                        value={donorID}
                        onChange={(e)=>{
                            setDonorId(e.target.value)
                        }}
                        />
                        <input 
                        placeholder="Donor Name" 
                        type="text"
                        value={donorName}
                        onChange={(e)=>{
                            setDonorName(e.target.value)
                        }}
                        />
                        <input 
                        placeholder="Contact Number" 
                        type="text"
                        value={contact}
                        onChange={(e)=>{
                            setContact(e.target.value)
                        }}
                        />
                        <input 
                        placeholder="Address" 
                        type="text"
                        value={address}
                        onChange={(e)=>{
                            setAddress(e.target.value)
                        }}
                        />
                        <input 
                        placeholder="Project ID" 
                        type="text"
                        value={projectId}
                        onChange={(e)=>{
                            setProjectId(e.target.value)
                        }}
                        />
                        <button className="waves-effect waves-light btn large-btn"
                        onClick={()=>addDonor()}
                        >
                            
                            Add Donor
                        </button><br/>
                    </div>
                <div id="test2" class="col s12">
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
                        </button><br/>
                    </div>

                </div>
              
              </div> */}
        </div>
        </>
    )
}

export default Profile
