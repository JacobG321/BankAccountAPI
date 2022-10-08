import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {CustomerContext} from '../context/CustomerContextProvider'



const accountTypes = {checking:{currentBalance:0}, savings:{currentBalance:0, interestRate:0}}



const ViewAccounts = ({loggedIn, setLoggedIn}) => {
  const [accounts, setAccounts] = useState([])
  const [accountType, setAccountType] = useState("")
  const {state,dispatch} = useContext(CustomerContext);
  const navigate = useNavigate()
  const [errors, setErrors] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // loader component, spinner thing, loading state ()
  // authorizes users
  
  useEffect(()=>{
    if(!loggedIn){      
      axios.get('http://localhost:8000/api/auth', {withCredentials:true, credentials:"include"})
      .then((res)=>{
        setIsLoaded(true)
        setLoggedIn(true)
        setAccounts(res.data.accounts)
      })
      .catch((err)=>{
        navigate('/')
        setLoggedIn(false)


      })
    }else{
      setIsLoaded(true)
    }
  },[])

  // logout
  const handleLogout = ()=>{
    console.log("logged out")
    dispatch({
      type:"LOGOUT_CUSTOMER",
      payload:navigate
    })
  }

  const accountTypeHandler = (e)=>{
    setAccountType(e)
  }

  const newAccountHandler = (e)=>{
    e.preventDefault()
    console.log({[accountType]:accountTypes}, "withoutAccoutType")
    console.log({[accountType]:accountTypes[accountType]}, 'withit')
    axios.post('http://localhost:8000/api/createAccount',{
      [accountType]:accountTypes[accountType]
    },{withCredentials:true})
    .then((res)=>{
      console.log(accountType)
    })
    .catch(err=>{
      const errorResponse = err.response.data.errors
      const errorArray = []
      for (const key of Object.keys(errorResponse)) {
          errorArray.push(errorResponse[key].message)
      }
      setErrors(errorArray)
  })
  }
  // replace null with loader
  return (
    <div>
    {
      !isLoaded ? null :

      <div>
        <h1>Accounts</h1>
        <button onClick={handleLogout}>Logout</button>

        <div>
          <h1>Open a new account</h1>
          <form onSubmit={newAccountHandler}>
            <label htmlFor="accountType">Choose account type</label>
            <select name="accountType" id="accountType" onChange={(e)=>accountTypeHandler(e.target.value)}>
              <option value="">Select an Account</option>
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
            <button type="submit">submit</button>
          </form>
        </div>
      </div>


    }
    
        
    </div>
  )
}

export default ViewAccounts