import './App.css';
import { useEffect, createContext, useReducer, useContext } from 'react'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Login from './components/auth/login';
import Navbar from './components/navbar'
import ProtectedResource from './components/protectedResource';
import Register from './components/auth/register';
import Profile from './components/profile';
import {reducer,initialState} from './reducers/userReducer'
import Patients from './components/patients';
import Info from './components/auth/info';
import EditDonor from './components/EditDonor';
import EditPatient from './components/EditPatient';
import AddDonor from './components/AddDonor';
import AddPatient from './components/AddPatient';

export const UserContext = createContext()

const Routing=()=>{
  const history = useHistory()
  const { state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/profile')
    }else{
      history.push('/login')
    }
  },[])
  return(
    <Switch>
        <Route exact path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/protectedResource">
          <ProtectedResource />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>
        
        <Route path="/allPatients">
          <Patients />
        </Route>

        <Route path="/info/:id">
          <Info />
        </Route>
        <Route path="/editPatient/:id">
          <EditPatient />
        </Route>
        <Route path="/editDonor/:id">
          <EditDonor />
        </Route>
        <Route path="/addDonor">
          <AddDonor />
        </Route>
        <Route path="/addPatient">
          <AddPatient />
        </Route>
    </Switch>

  )
}

function App() {
  const [ state, dispatch ] = useReducer(reducer,initialState)
  return (
    <div>
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
      <Navbar/>
      <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
    </div>
  );
}

export default App;
