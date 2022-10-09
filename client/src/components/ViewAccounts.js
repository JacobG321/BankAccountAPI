import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {CustomerContext} from '../context/CustomerContextProvider'



const accountTypes = {checking:{currentBalance:0}, savings:{currentBalance:0, interestRate:2}}

const ViewAccounts = ({loggedIn, setLoggedIn}) => {
  const [accounts, setAccounts] = useState([])
  const [accountType, setAccountType] = useState("")
  const {state,dispatch} = useContext(CustomerContext);
  const navigate = useNavigate()
  const [errors, setErrors] = useState([])
  const [isValid, setIsValid] = useState(false)
  const [customer, setCustomer] = useState({})
  
  useEffect(()=>{
    if(!loggedIn){      
      axios.get('http://localhost:8000/api/auth', {withCredentials:true, credentials:"include"})
      .then((res)=>{
        console.log(res.data.customer,"custo")
        setCustomer(res.data.customer)
        setIsValid(true)
        setLoggedIn(true)
      })
      .catch((err)=>{
        navigate('/')
        setLoggedIn(false)
      })
    }else{
      setIsValid(true)
    }
    
  },[])

  // ?.id is an optional chaining
  useEffect(()=>{
    if(customer?.id){
      axios.get(`http://localhost:8000/api/customer/${customer.id}`, {withCredentials:true, credentials:"include"})
      .then((res)=>{
        setAccounts(res.data.customer.accounts)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }, [customer])


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

  // this is for resetting the input on creating a new account
  let newAccountTypeInput = document.getElementById('newAccountType')
  const newAccountHandler = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:8000/api/createAccount',
      {[accountType]:accountTypes[accountType]},
      {withCredentials:true})
    .then((res)=>{
      console.log(res.data.accounts,"res")
      setAccounts([...accounts,res.data.accounts])
      newAccountTypeInput.value = ('')
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

  const isLoaded = () =>{
    if(!isValid || !accounts){
      return false
    }
  }

  // replace null with loader
  return (
    <div>
    {
      isLoaded() ? null :
      

      <div>
        <h1>Welcome {customer.username}</h1>
        <button onClick={handleLogout}>Logout</button>

        <div>
          <h2>Open a new account</h2>
          <form onSubmit={newAccountHandler}>
            <label htmlFor="newAccountType">Choose account type</label>
            <select name="newAccountType" id="newAccountType" onChange={(e)=>accountTypeHandler(e.target.value)}>
              <option value="">Select an Account</option>
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
            <button type="submit">submit</button>
          </form>
        </div>

          <table>
            <thead>
            </thead>
            <tbody>
              {
                accounts.map((account,index)=>{
                    if(!account.checking){
                      return <tr key={index}>
                      <td>Savings Account</td>
                      <td>ID: {account._id}</td>
                      <td>Current balance: ${account.savings.currentBalance}</td>
                      <td>Interest rate: {account.savings.interestRate}%</td>
                    </tr>
                    }else{
                      return <tr key={index}>
                      <td>Checking Account</td>
                      <td>ID: {account._id}</td>
                      <td>Current balance: ${account.checking.currentBalance}</td>
                    </tr>
                    }
                })
              }
            </tbody>
          </table>
      </div>


    }
    
        
    </div>
  )
}

export default ViewAccounts