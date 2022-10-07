import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {CustomerContext} from '../context/CustomerContextProvider'




const ViewAccounts = ({loggedIn}) => {
  const [accounts, setAccounts] = useState([])
  const {state,dispatch} = useContext(CustomerContext);
  const navigate = useNavigate()


  useEffect(()=>{

    axios.get('http://localhost:8000/api/auth', {withCredentials:true, credentials:"include"})
    .then((res)=>{
      console.log('AUTHORIZING', res)
      setAccounts(res.data.accounts)
    })
    .catch((err)=>{
      console.log(err)
      console.log(loggedIn)
    })
  },[])

  const handleLogout = ()=>{
    console.log("logged out")
    dispatch({
      type:"LOGOUT_CUSTOMER",
      payload:navigate
    })
    
  }

  return (
    <div>
    {
      // !loggedIn ? <Navigate to="/"/> :

      <div>
        <h1>Accounts</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>


    }
    
        
    </div>
  )
}

export default ViewAccounts