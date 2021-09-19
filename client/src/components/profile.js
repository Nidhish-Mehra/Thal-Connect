import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
const axios = require("axios")

function Profile() {
    const [user, setUser] = useState([])
    const [file, setFile] = useState("")
    const history = useHistory()


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
            className="col s6 card" onSubmit={onSubmit}>
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


            <div className="card col s6" style={{ padding: '10px' , textAlign: 'center'}}>
              <input 
              placeholder="User Name" 
              type="text" 
              />
              <input 
              placeholder="password" 
              type="password"
              />
              <button className="waves-effect waves-light btn large-btn"
              >
                  Sign IN
              </button><br/>
          </div>

        </div>
        </>
    )
}

export default Profile
