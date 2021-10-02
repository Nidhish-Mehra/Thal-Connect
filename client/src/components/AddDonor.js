import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

function AddDonor() {
    const [donorID, setDonorId] = useState("")
    const [donorName, setDonorName] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [projectId, setProjectId] = useState("")
    const history = useHistory()
    const addDonor = ()=>{
        fetch("/addDonor",{
            method:"post",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                donorID,
                donorName,
                contact,
                address,
                projectId
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: "Donor Added Successfully", classes:"#43a047 green darken-1"})
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
                        </button>
            </div>
            
        </div>
    )
}

export default AddDonor
