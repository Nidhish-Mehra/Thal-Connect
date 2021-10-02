import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import M from 'materialize-css'

function EditDonor() {
    const [donorID, setDonorId] = useState("")
    const [donorName, setDonorName] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [projectId, setProjectId] = useState("")
    const [data,setData] = useState("")
    const {id} = useParams()


    const updateDonor = ()=>{
        fetch('/updateDonor', {
            method: "put",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                BloodDonorID:id,
                donorName,
                contact,
                address
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
        fetch('/getDonor', {
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
                setDonorName(data.donorName)
                setContact(data.ContactNumber)
                setAddress(data.Address)
            //    setReqUser(data.donors)
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
                <p>{data.BloodDonorID}</p>
                </div>
                
                <div className="row">
                    <div className="col s6">
                        <p>Current Name: {data.DonorName}</p>
                        <p>Current Number: {data.ContactNumber}</p>
                        <p>Address: {data.Address}</p>
                    </div>
                    <div className="col s6">
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
                    </div>
                </div>
                        
                        

                         
                        <button className="waves-effect waves-light btn large-btn"
                        onClick={()=>updateDonor()}
                        >
                            
                            Update Donor
                        </button>
            </div>
        </div>
    )
}

export default EditDonor
