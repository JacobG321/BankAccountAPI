import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {CustomerContext} from '../context/CustomerContextProvider'
import styles from '../styles/ViewAccounts.module.css'


// when creating a new account/signing in, information does not populate on load
// when deleting an account, accounts do not update

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
  const [accountsUpdated, setAccountsUpdated] = useState(false)

  useEffect(()=>{
      axios.get('http://localhost:8000/api/auth', {withCredentials:true, credentials:"include"})
      .then((res)=>{
        setCustomer(res.data.customer)
        setIsValid(true)
      })
      .catch((err)=>{
        navigate('/')
        setLoggedIn(false)
      })
    setAccountsUpdated(false)
  },[accountsUpdated])

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
      return setError(<p className={styles.error}>You must have at least one bank account!</p>)
    }else{
      axios.delete(`http://localhost:8000/api/accounts/${temp}`,{withCredentials:true, credentials:"include"})
      .then((res)=>{
        setError('')
        setAccountsUpdated(true)
      })
      .catch((err)=>{
      })
    }
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


  return (
    <div className={styles.outside}>
    {
      isLoaded() ? null :
      <div className={styles.container2}>

        <div className={styles.header}>
          <h1>Welcome {customer.username}</h1>
          <button onClick={handleLogout} className={styles.logoutBTN}>Logout</button>
        </div>
        <div className={styles.container}>
                {/* display all accounts */}
              <div className={styles.accounts}>
              <h2 className={styles.bankAccountHeader}>Bank Accounts</h2>
                {error}
                {
                  accounts.map((account,index)=>{
                      if(!account.checking){
                        let str = account._id
                        let shorten = str.slice(str.length-5, str.length)
                        let negativeBalance
                        if(account.savings.currentBalance<0){
                          negativeBalance=<p>Current balance: <span className={styles.negativeBalance}>${account.savings.currentBalance}</span></p>
                        }else{
                          negativeBalance = <p>Current balance: ${account.savings.currentBalance}</p>
                        }
                        return <div className={styles.accountSingle} key={index}>
                          <div>
                            <h3>Savings (...{shorten})</h3>
                          </div>
                            {negativeBalance}
                            <button className={styles.closeAccountBTN}  value={account._id} onClick={deleteHandler}>Close account</button>
                      </div>
                      }else{
                        let str = account._id
                        let shorten = str.slice(str.length-5, str.length)
                        let negativeBalance
                        if(account.checking.currentBalance<0){
                          negativeBalance=<p>Current balance: <span className={styles.negativeBalance}>${account.checking.currentBalance}</span></p>
                        }else{
                          negativeBalance = <p>Current balance: ${account.checking.currentBalance}</p>
                        }
                        return <div className={styles.accountSingle} key={index}>
                            <h3>Checking (...{shorten})</h3>
                            {negativeBalance}
                            <button className={styles.closeAccountBTN} value={account._id} onClick={deleteHandler}>Close account</button>
                            </div>
                            }
                      })
                }
              </div>
              <h2 className={styles.accountActionsH2}>Account Actions</h2>
              <div className={styles.accountActions}>
                  {/* deposit */}
                  <form onSubmit={depositHandler}>
                    <h3>Deposit</h3>
                    <div>
                        <label htmlFor="account_id">Choose account</label>
                        <select onChange={(e)=>setDepositAccount(e.target.value)} name="account_id" id="account_id">
                          <option value="default">Choose an account</option>
                          {
                            accounts.map((account,index)=>{
                              if(account.checking){
                                let str = account._id
                                let shorten = str.slice(str.length-5, str.length)
                                return <option id={index} value={account._id} >Checking (...{shorten})</option>
                              }
                            })
                          }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="depositAmount">Amount</label>
                        <input type="number" name='depositAmount' value={depositAmount} onChange={(e)=>setDepositAmount(e.target.value)}/>
                    </div>
                    <button className={styles.accountActionsBTN}type="submit">Deposit</button>
                  </form>

                  {/* withdrawal */}
                  <form onSubmit={withdrawalHandler}>
                    <h3>Withdraw</h3>
                    <div>
                      <label htmlFor="account_id">Choose account</label>
                      <select onChange={(e)=>setWithdrawalAccount(e.target.value)} name="account_id" id="account_id">
                        <option value="default">Choose an account</option>
                        {
                          accounts.map((account,index)=>{
                            if(account.checking){
                              let str = account._id
                              let shorten = str.slice(str.length-5, str.length)
                              return <option id={index} value={account._id} >Checking (...{shorten})</option>
                            }
                          })
                        }
                      </select>
                    </div>
                    <div>
                        <label htmlFor="withdrawalAmount">Amount</label>
                        <input type="number" name='withdrawalAmount' value={withdrawalAmount} onChange={(e)=>setWithdrawlAmount(e.target.value)}/>
                    </div>
                    <button className={styles.accountActionsBTN} type="submit">Withdraw</button>
                  </form>

                  <form onSubmit={transferHandler}>
                  <h3>Transfer</h3>

                  {/* transfer from */}
                  <div className={styles.transfersDiv}>
                      <label htmlFor="account_id_send">Transfer from</label>
                      <select onChange={(e)=>setSendAccount(e.target.value)} name="account_id_send" id="account_id_send">
                        <option value="default">Choose an account</option>
                        {
                          accounts.map((account,index)=>{
                            if(account.checking){
                              let str = account._id
                              let shorten = str.slice(str.length-5, str.length)
                              return <option id={index} value={account._id} >Checking (...{shorten})</option>
                            }else{
                              let str = account._id
                              let shorten = str.slice(str.length-5, str.length)
                              return <option id={index} value={account._id} >Savings (...{shorten})</option>
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
                              return <option id={index} value={account._id} >Checking (...{shorten})</option>
                            }else{
                              let str = account._id
                              let shorten = str.slice(str.length-5, str.length)
                              return <option id={index} value={account._id} >Savings (...{shorten})</option>
                            }
                          })
                        }
                      </select>
                  </div>
                  <label htmlFor="sendAmount">Amount</label>
                  <input type="number" name='sendAmount' value={sendAmount} onChange={(e)=>setSendAmount(e.target.value)}/>
                  <button className={styles.accountActionsBTN} type="submit">Transfer</button>
                </form>
                </div>
              </div>
                {/* new bank account handler */}
                <div className={styles.openAccountDiv}>
                  <h3 className={styles.openAccount}>Open a new account</h3>
                  <form onSubmit={newAccountHandler}>
                    <label htmlFor="newAccountType">Choose account type</label>
                    <select name="newAccountType" id="newAccountType" onChange={(e)=>accountTypeHandler(e.target.value)}>
                      <option value="">Select an Account</option>
                      <option value="checking">Checking</option>
                      <option value="savings">Savings</option>
                    </select>
                    <button className={styles.accountActionsBTN} type="submit">submit</button>
                  </form>
                </div>
      </div>
              


    }
    </div>
  )
}

export default ViewAccounts