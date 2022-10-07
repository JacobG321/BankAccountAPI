import {useState, useEffect, useContext} from 'react'
import CreateAccount from "./components/CreateAccount";
import ViewAccounts from "./components/ViewAccounts";
import LandingPage from "./components/LandingPage"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios'
import {CustomerContext} from './context/CustomerContextProvider'



function App() {
  const [loggedIn,setLoggedIn] = useState(false)
  const {state,dispatch} = useContext(CustomerContext)

  useEffect(()=>{
    axios.post('http://localhost:8000/api/isLoggedIn',{},{withCredentials:true})
    .then((user)=>{
      console.log(user.data)
      dispatch({
        type:"SET_USER",
        payload:user.data
      })
      // setUser(user.data) this is what we did before
      setLoggedIn(true)
    })
    .catch((err)=>{
      console.log(err.response.data)
      // setUser(null)
      dispatch({
        type:"NULL_USER",
      })
    })

  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} path="/"/>
          <Route element={<CreateAccount setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} path="/create"/>
          <Route element={<ViewAccounts/>} path="/accounts"/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
