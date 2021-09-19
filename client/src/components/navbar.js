import { useContext } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

function Navbar() {
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = () =>{
    if(state){
      return[
        <li><Link to="/profile">Upload</Link></li>,
        <li><Link to="/allPatients">Patients</Link></li>,
        <li><a onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/login')
        }}>
          Log Out
          </a></li>
      ]
    }else{
      return[
        <li><Link to="/login">Login</Link></li>
        // <li><Link to="/register">Register</Link></li>
      ]

    }
  }
  return (
    <div>
        <nav >
            <div className="nav-wrapper container">
            <Link to={state?"/profile":"/login"} className="brand-logo">ThalConnect</Link>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              {renderList()}
            </ul>
            </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          {renderList()}
        </ul>
          
    </div>
  );
}

export default Navbar;