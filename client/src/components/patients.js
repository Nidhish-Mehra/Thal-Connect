import React,{useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

function Patients() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [type, setType] = useState('');
    const history = useHistory()
    useEffect(() => {
      fetch("/allPatients", {
        method: "get",
        headers: {
          "Authorization":"Bearer "+localStorage.getItem("jwt"),
          "Content-type": "application/json"
        },
      })
        .then((res) => res.json())
        .then((patients) => {
          setData(patients)
          console.log(data);
        });
    }, []);

    // const handleClick = ()=>{
    //     fetch("/filteredPatient",{
    //         method:"post",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             type,
    //         })
    //     }).then(res=>res.json())
    //     .then(data=>{
    //         if(data.error){
    //             M.toast({html:data.error, classes:"#c62828 red darken-3"})
    //         }
    //         else{
    //             setData(data)
    //         }
    //     }).catch(error=>{
    //         console.log(error)
    //     })
    // }


    // const getDonors = (id)=>{
    //     fetch('/donorlist',{
    //         method:'put',
    //         headers:{
    //             "Authorization":"Bearer "+localStorage.getItem("jwt"),
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             _id:id
    //         })
    //     }).then(res=>res.json())
    //     .then(data=>{
    //         if(data.error){
    //             M.toast({html:data.error, classes:"#c62828 red darken-3"})
    //         }
    //         else{
    //             M.toast({html: data.message, classes:"#43a047 green darken-1"})
    //         }
    //     }).catch(error=>{
    //         console.log(error)
    //     })
    // }

    return (
        <div>
            <div className="row">
                <input 
                className="col s8 offset-s2" 
                type="text" 
                placeholder="Search Patient"
                onChange={event=> {setSearchTerm(event.target.value)}}/>


            {
                data.filter((item)=>{
                    if(searchTerm==""){
                        return item
                    }else if(item.ProjectID.toLowerCase().includes(searchTerm.toLowerCase())){
                        return item
                    }
                }).map(item=>{
                    return(

                        <div class="col s8 offset-s2">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                            <span class="card-title">Patient: {item.ProjectID}</span>
                            <p>Hospital: {item.Hospital}</p><br/>
                            <p>Age: {item.PatientAge}</p><br/>
                            <p>Gender: {item.Sex}</p><br/>
                            </div>
                            <div class="card-action">
                            <button 
                            className="btn waves-effect waves-light red" 
                            onClick={()=>{
                                history.push(`/info/${item.ProjectID}`)
                                }}
                                >More Info</button>
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

export default Patients
