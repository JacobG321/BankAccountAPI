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
  const [isValid, setIsValid] = useState(false)
  const [customer, setCustomer] = useState({})
  const [depositAmount, setDepositAmount] = useState(0)
  const [depositAccount, setDepositAccount] = useState('')
  const [withdrawalAmount, setWithdrawlAmount] = useState(0)
  const [withdrawalAccount, setWithdrawalAccount] = useState('')
  const [newBalanceWithdrawal,setNewBalanceWithdrawal] = useState(0)
  const [newBalanceDeposit,setNewBalanceDeposit] = useState(0)
  const [receiveAccount, setReceiveAccount] = useState('')
  const [sendAccount, setSendAccount] = useState('')
  const [sendAmount, setSendAmount] = useState(0)
  const [error, setError] = useState("")

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
      console.log(err)
  })
}

  // DELETE
  const deleteHandler = (e) =>{
    let temp = e.target.value
    
    if(accounts.length<=1){
      return setError("You must have at least one bank account!")
    }else{
      axios.delete(`http://localhost:8000/api/accounts/${temp}`,{withCredentials:true, credentials:"include"})
      .then((res)=>{
        setError('')
      })
      .catch((err)=>{
      })
    }
    return temp
  }


  // makes sure user is valid and accounts are loaded
  const isLoaded = () =>{
    if(!isValid || !accounts){
      return false
    }
  } 

  // update a single balance
  const newBalDeposit = {checking:{currentBalance:newBalanceDeposit}}

  // deposit
  const depositHandler = (e) => {
    e.preventDefault()
    accounts.map((account,index)=>{
      if(account._id === depositAccount){
        setNewBalanceDeposit(account.checking.currentBalance+=Number(depositAmount))
      }
    })
  }

  // deposit Check if newBalance state is not 0
  if(newBalanceDeposit){
    axios.put(`http://localhost:8000/api/accounts/${depositAccount}`,newBalDeposit)
    .then((res)=>{
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  


  const newBalWithdrawal = {checking:{currentBalance:newBalanceWithdrawal}}

  // Withdrawal
  const withdrawalHandler = (e) => {
    e.preventDefault()
    accounts.map((account,index)=>{
      if(account._id === withdrawalAccount){
        setNewBalanceWithdrawal(account.checking.currentBalance-=Number(withdrawalAmount))
      }
    })
  }

  // Withdrawal Check if newBalance state is not 0
  if(newBalanceWithdrawal){
    axios.put(`http://localhost:8000/api/accounts/${withdrawalAccount}`,newBalWithdrawal)
    .then((res)=>{
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  // sendAccount, receiveAccount, sendAmount

  const transferHandler = (e) => {
    e.preventDefault()
    console.log(accounts)
    const sendingAccount = accounts.find(account=>account._id==sendAccount)
    const receivingAccount = accounts.find(account=>account._id==receiveAccount)
    let sendAccountType
    let receiveAccountType
    if("savings" in sendingAccount){
      sendAccountType="savings"
    }else{
      sendAccountType="checking"
    }
    if("savings" in receivingAccount){
      receiveAccountType="savings"
    }else{
      receiveAccountType="checking"
    }

    axios.put("http://localhost:8000/api/accounts/transfer",{
      sendAccount,
      receiveAccount,
      sendAccountType,
      receiveAccountType,
      sendAmount
    })
    .then((res)=>{
      const newAccounts = accounts.map(account=>{
        if(account._id === res.data.updatedSenderAccount._id){
          account=res.data.updatedSenderAccount
        }else if(account._id===res.data.updatedReceiverAccount._id){
          account=res.data.updatedReceiverAccount
        }
        return account
      })
      setAccounts([...newAccounts])
    })
    .catch((err)=>{
      console.log(err)
    })
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

              {error}
              {
                accounts.map((account,index)=>{
                    if(!account.checking){
                      return <div key={index}>
                        <h2>Savings Account {account._id}</h2>
                        <p>Current balance: ${account.savings.currentBalance}</p>
                        <p>Interest rate: {account.savings.interestRate}%</p>
                        <button  value={account._id} onClick={deleteHandler}>Delete account</button>
                    </div>
                    }else{ 
                      return <div key={index}>
                          <h2>Checking Account {account._id}</h2>
                          <p>Current balance: ${account.checking.currentBalance}</p>
                          <button  value={account._id} onClick={deleteHandler}>Delete account</button>
                          </div>
                          }
                    })
              }


                {/* deposit */}
                <form onSubmit={depositHandler}>
                  <h2>Deposit</h2>
                  <label htmlFor="account_id">Choose account</label>
                  <select onChange={(e)=>setDepositAccount(e.target.value)} name="account_id" id="account_id">
                    <option value="default">Choose an account</option>
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
                    <option value="default">Choose an account</option>
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
                <select onChange={(e)=>setSendAccount(e.target.value)} name="account_id_send" id="account_id_send">
                  <option value="default">Choose an account</option>
                  {
                    accounts.map((account,index)=>{
                      if(account.checking){
                        let str = account._id
                        let shorten = str.slice(str.length-5, str.length)
                        return <option id={index} value={account._id} >Checking ...{shorten}</option>
                      }else{
                        let str = account._id
                        let shorten = str.slice(str.length-5, str.length)
                        return <option id={index} value={account._id} >Savings ...{shorten}</option>
                      }
                    })
                  }
                </select>

                {/* transfer to */}
                <label htmlFor="account_id_receive">Transfer to</label>
                <select onChange={(e)=>setReceiveAccount(e.target.value)} name="account_id_receive" id="account_id_receive">
                  <option value="default">Choose an account</option>
                  {
                    accounts.map((account,index)=>{
                      if(account.checking){
                        let str = account._id
                        let shorten = str.slice(str.length-5, str.length)
                        return <option id={index} value={account._id} >Checking ...{shorten}</option>
                      }else{
                        let str = account._id
                        let shorten = str.slice(str.length-5, str.length)
                        return <option id={index} value={account._id} >Savings ...{shorten}</option>
                      }
                    })
                  }
                </select>
                <label htmlFor="sendAmount">Amount</label>
                <input type="number" name='sendAmount' value={sendAmount} onChange={(e)=>setSendAmount(e.target.value)}/>
                <button type="submit">Transfer</button>
              </form>
      </div>


    }
    
        
    </div>
  )
}

export default ViewAccounts