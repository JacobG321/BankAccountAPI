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
  const [depositAmount, setDepositAmount] = useState(0)
  const [depositAccount, setDepositAccount] = useState('')
  const [withdrawalAmount, setWithdrawlAmount] = useState(0)
  const [withdrawalAccount, setWithdrawalAccount] = useState('')
  const [newBalance,setNewBalance] = useState(0)
  
  // on load, checks if logged in and sets isValid, isLogged in, and customer(customer is used to access accounts for that one customer)
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

  // sets the new account type
  const accountTypeHandler = (e)=>{
    setAccountType(e)
  }

  let newAccountTypeInput = document.getElementById('newAccountType')

  const newAccountHandler = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:8000/api/createAccount',
      {[accountType]:accountTypes[accountType]},
      {withCredentials:true})
    .then((res)=>{

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

  // makes sure user is valid and accounts are loaded
  const isLoaded = () =>{
    if(!isValid || !accounts){
      return false
    }
  } 

  // update a single balance
  const newBal = {checking:{currentBalance:newBalance}}

  // deposit
  const depositHandler = (e) => {
    e.preventDefault()
    accounts.map((account,index)=>{
      if(account._id === depositAccount){
        setNewBalance(account.checking.currentBalance+=Number(depositAmount))
      }
    })
  }

  // deposit Check if newBalance state is not 0
  if(newBalance){
    axios.put(`http://localhost:8000/api/accounts/${depositAccount}`,newBal)
    .then((res)=>{
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  // Withdraw
  const withdrawalHandler = (e) => {
    e.preventDefault()
    accounts.map((account,index)=>{
      if(account._id === withdrawalAccount){
        setNewBalance(account.checking.currentBalance-=Number(withdrawalAmount))
      }
    })
  }

  // Withdrawal Check if newBalance state is not 0
  if(newBalance){
    axios.put(`http://localhost:8000/api/accounts/${withdrawalAccount}`,newBal)
    .then((res)=>{
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  const transferHandler = (e) =>{
    e.preventDefault()

  }



  // replace null with loader
  return (
    <div>
    {
      isLoaded() ? null :
      

      <div>
        <h1>Welcome {customer.username}</h1>
        <button onClick={handleLogout}>Logout</button>

        {/* new bank account handler */}
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

              {/* display all accounts */}
              {
                accounts.map((account,index)=>{
                    if(!account.checking){
                      return <div key={index}>
                        <h2>Savings Account {account._id}</h2>
                        <p>Current balance: ${account.savings.currentBalance}</p>
                        <p>Interest rate: {account.savings.interestRate}%</p>
                    </div>
                    }else{ 
                      return <div key={index}>
                          <h2>Checking Account {account._id}</h2>
                          <p>Current balance: ${account.checking.currentBalance}</p>
                              </div>
                          }
                    })
              }

                {/* deposit */}
                <form onSubmit={depositHandler}>
                  <h2>Deposit</h2>
                  <label htmlFor="account_id">Choose account</label>
                  <select onChange={(e)=>setDepositAccount(e.target.value)} name="account_id" id="account_id">
                    <option value="blah">Choose an account</option>
                    {
                      accounts.map((account,index)=>{
                        if(account.checking){
                          let str = account._id
                          let shorten = str.slice(str.length-5, str.length)
                          return <option id={index} value={account._id} >Checking ...{shorten}</option>
                        }
                      })
                    }
                  </select>
                  <label htmlFor="depositAmount">Amount</label>
                  <input type="number" name='depositAmount' value={depositAmount} onChange={(e)=>setDepositAmount(e.target.value)}/>
                  <button type="submit">Deposit</button>
                </form>

                {/* withdrawal */}
                <form onSubmit={withdrawalHandler}>
                  <h2>Withdraw</h2>
                  <label htmlFor="account_id">Choose account</label>
                  <select onChange={(e)=>setWithdrawalAccount(e.target.value)} name="account_id" id="account_id">
                    <option value="blah">Choose an account</option>
                    {
                      accounts.map((account,index)=>{
                        if(account.checking){
                          let str = account._id
                          let shorten = str.slice(str.length-5, str.length)
                          return <option id={index} value={account._id} >Checking ...{shorten}</option>
                        }
                      })
                    }
                  </select>
                  <label htmlFor="withdrawalAmount">Amount</label>
                  <input type="number" name='withdrawalAmount' value={withdrawalAmount} onChange={(e)=>setWithdrawlAmount(e.target.value)}/>
                  <button type="submit">Withdraw</button>
                </form>

                <form onSubmit={transferHandler}>
                <h2>Transfer</h2>

                {/* transfer from */}
                <label htmlFor="account_id_send">Transfer from</label>
                <select onChange={(e)=>setWithdrawalAccount(e.target.value)} name="account_id_send" id="account_id_send">
                  <option value="blah">Choose an account</option>
                  {
                    accounts.map((account,index)=>{
                      if(account.checking){
                        let str = account._id
                        let shorten = str.slice(str.length-5, str.length)
                        return <option id={index} value={account._id} >Checking ...{shorten}</option>
                      }
                    })
                  }
                </select>

                {/* transfer */}
                <label htmlFor="account_id_receive">Transfer to</label>
                <select onChange={(e)=>setWithdrawalAccount(e.target.value)} name="account_id_receive" id="account_id_receive">
                  <option value="blah">Choose an account</option>
                  {
                    accounts.map((account,index)=>{
                      if(account.checking){
                        let str = account._id
                        let shorten = str.slice(str.length-5, str.length)
                        return <option id={index} value={account._id} >Checking ...{shorten}</option>
                      }
                    })
                  }
                </select>
                <label htmlFor="withdrawalAmount">Amount</label>
                <input type="number" name='withdrawalAmount' value={withdrawalAmount} onChange={(e)=>setWithdrawlAmount(e.target.value)}/>
                <button type="submit">Transfer</button>
              </form>
      </div>


    }
    
        
    </div>
  )
}

export default ViewAccounts