import React, { useState } from 'react'
import {useNavigate, Link} from "react-router-dom";
import NonUserNavBar from './NonUserNavBar'
import styles from '../styles/CreateAccount.module.css'
import axios from 'axios';



const CreateAccount = () => {

  const billingNotMailing =  
  <div>
    <h2>Billing address</h2>
    <div className={styles.addresses}>
      <div className={styles.labels}>
        <label htmlFor="streetAddress">Street address</label>
        <label htmlFor="city">City</label>
        <label htmlFor="state">State</label>
        <label htmlFor="zipcode">Zipcode</label>
      </div>

      <div className={styles.inputs}>
        <input type="text" htmlFor='streetAddress' name="streetAddress" id="streetAddress" />
        <input type="text" htmlFor='city' name="city" id="city" />
        <input type="text" htmlFor='state' name="state" id="state" />
        <input type="text" htmlFor='zipcode' name="zipcode" id="zipcode" />
      </div>
    </div>
  </div>

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [addressMailing,setAddressMailing] = useState({})
  const [addressBilling,setAddressBilling] = useState({})
  const [socialSecurityNumber, setSocialSecurityNumber] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])


  let billingSameAsMailing = true
  const [isBillMail, setIsBillMail] = useState()
  const billingIsMailing = (e) => {
    billingSameAsMailing = e

    if(billingSameAsMailing==="true"){
      console.log(billingSameAsMailing)
      setIsBillMail()
    }else{
      setIsBillMail(billingNotMailing)
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/customer', {
      firstName,
      middleName,
      lastName,
      addressMailing,
      addressBilling,
      socialSecurityNumber,
      email,
      phoneNumber,
      username,
      password,
    })
    .then(res=>{
      setFirstName('')
      setMiddleName('')
      setLastName('')
      setAddressMailing({})
      setAddressBilling({})
      setSocialSecurityNumber('')
      setEmail('')
      setPhoneNumber('')
      setPassword('')
      setUsername('')
      setPassword('')

      streetAddressInput.value = ('')
      cityInput.value = ('')
      stateInput.value = ('')
      zipcodeInput.value = ('')

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


  const streetAddressHandler = (e) => {
    setAddressMailing({...addressMailing, streetAddress:e})
  }
  const cityHandler = (e) => {
    setAddressMailing({...addressMailing,city:e})
  }
  const stateHandler = (e) => {
    setAddressMailing({...addressMailing,state:e})
  }
  const zipcodeHandler = (e) => {
    e = Number(e)
    setAddressMailing({...addressMailing,zipcode:e})
  }

  let streetAddressInput = document.getElementById('streetAddress')
  let cityInput = document.getElementById('city')
  let stateInput = document.getElementById('state')
  let zipcodeInput = document.getElementById('zipcode')

  console.log(addressMailing)

  return (

    <div>
      <NonUserNavBar/>
      <div className={styles.createContainer}>

        <h1>New Jase account</h1>
        {errors.map((err, index) => <p className={styles.error} key={index}>{err}</p>)}
          <form onSubmit={onSubmitHandler} className={styles.form}>
            <div className={styles.personInfo}>
              <div className={styles.labels}>
                <label htmlFor="firstName">First name</label>
                <label htmlFor="middleName">Middle name (optional)</label>
                <label htmlFor="lastName">Last name</label>
                <label htmlFor="socialSecurityNumber">Social Security Number</label>
                <label htmlFor="email">Email</label>
                <label htmlFor="phoneNumber">Phone number</label>
              </div>
              <div className={styles.inputs}>
                <input type="text" htmlFor='firstName' name="firstName" id="firstName" value={firstName} onChange = {(e)=>setFirstName(e.target.value)}/>
                <input type="text" htmlFor='middleName' name="middleName" id="middleName" value={middleName} onChange = {(e)=>setMiddleName(e.target.value)}/>
                <input type="text" htmlFor='lastName' name="lastName" id="lastName" value={lastName} onChange = {(e)=>setLastName(e.target.value)}/>
                <input type="text" htmlFor='socialSecurityNumber' name="socialSecurityNumber" id="socialSecurityNumber" value={socialSecurityNumber} onChange = {(e)=>setSocialSecurityNumber(e.target.value)}/>
                <input type="text" htmlFor='email' name="email" id="email" value={email} onChange = {(e)=>setEmail(e.target.value)}/>
                <input type="text" htmlFor='phoneNumber' name="phoneNumber" id="phoneNumber" value={phoneNumber} onChange = {(e)=>setPhoneNumber(e.target.value)}/>
              </div>
            </div>

            <h2>Mailing address</h2>
            <div className={styles.addresses}>
              <div className={styles.labels}>
                <label htmlFor="streetAddress">Street address</label>
                <label htmlFor="city">City</label>
                <label htmlFor="state">State</label>
                <label htmlFor="zipcode">Zipcode</label>
              </div>

              <div className={styles.inputs}>
                <input type="text" htmlFor='streetAddress' name="streetAddress" id="streetAddress"  onChange = {(e)=>streetAddressHandler(e.target.value)}/>
                <input type="text" htmlFor='city' name="city" id="city"   onChange = {(e)=>cityHandler(e.target.value)}/>
                <input type="text" htmlFor='state' name="state" id="state"  onChange = {(e)=>stateHandler(e.target.value)}/>
                <input type="text" htmlFor='zipcode' name="zipcode" id="zipcode"  onChange = {(e)=>zipcodeHandler(e.target.value)}/>
              </div>
            </div>


              <p>Is your billing address the same as the mailing address?</p>
                <div className={styles.radioBtns}>
                    <label htmlFor="yes">Yes</label>
                    <input type="radio" onChange={(e)=>billingIsMailing(e.target.value)} name='billingSameAsMailing' id="yes" value="true" defaultChecked="checked"/>
                    <label htmlFor="no">No</label>
                    <input type="radio" onChange={(e)=>billingIsMailing(e.target.value)} name='billingSameAsMailing' id="no" value="false"/>
                </div>

            {isBillMail}


            <h2>Login information</h2>
            <div className={styles.personInfo}>
              <div className={styles.labels}>
                <label htmlFor="username">Username</label>
                <label htmlFor="password">Password</label>
                <label htmlFor="confirmPassword">Confirm password</label>
              </div>

              <div className={styles.inputs}>
                <input type="text" htmlFor='username' name="username" id="username" value={username} onChange = {(e)=>setUsername(e.target.value)}/>
                <input type="text" htmlFor='password' name="password" id="password" />
                <input type="text" htmlFor='confirmPassword' name="confirmPassword" id="confirmPassword" />
              </div>
            </div>
            <button type="submit">Submit information</button>
          </form>
      </div>
    </div>
  )
}

export default CreateAccount