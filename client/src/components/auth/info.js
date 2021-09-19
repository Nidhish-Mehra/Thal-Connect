import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import M from 'materialize-css'

function Info() {
    const {id} = useParams()
    const [reqUser,setReqUser] = useState([])
    const getUser = ()=> {
        fetch('/donorlist', {
            method: "put",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                ProjectId:id
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }else{
                console.log(data.donors)
               setReqUser(data.donors)
                console.log("this is executed")
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        getUser();
    },[])
    return (
        <div>
        <div className="row">
        {
            reqUser.map(item=>{
                return(
                    
                    <div class="col s12 m4">
                    <div class="card darken-1">
                        <div class="card-content">
                        <span class="card-title">Donor ID: {item.BloodDonorID}</span>
                        <p>Name: {item.DonorName}</p><br/>
                        <p>Number: {item.ContactNumber}</p><br/>
                        <p>Address: {item.Address}</p><br/>
                        </div>
                        <div class="card-action">
                        <button 
                        className="btn waves-effect waves-light red" 
                        
                            >Request</button>
                        </div>
                    </div>
                    </div>
                
                )
            })
        }
        </div>
        
    </div>
    )
}

export default Info
