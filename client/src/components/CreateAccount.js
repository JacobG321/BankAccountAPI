import React, { useState } from 'react'
import {useNavigate, Link} from "react-router-dom";
import NonUserNavBar from './NonUserNavBar'
import styles from '../styles/CreateAccount.module.css'
import axios from 'axios';



const CreateAccount = () => {

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [socialSecurityNumber, setSocialSecurityNumber] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [addressMailing,setAddressMailing] = useState({})
  const [addressBilling,setAddressBilling] = useState(null)
  const [billingSame, setBillingSame] = useState(true)


  // const BillingNotMailing =  () => (
  // <div>
  //   <h2>Billing address</h2>
  //   <div className={styles.addresses}>
  //     <div className={styles.labels}>
  //       <label htmlFor="streetAddress">Street address</label>
  //       <label htmlFor="city">City</label>
  //       <label htmlFor="state">State</label>
  //       <label htmlFor="zipcode">Zipcode</label>
  //     </div>

  //     <div className={styles.inputs}>
  //               <input type="text" htmlFor='streetAddress' name="streetAddress" id="streetAddress"  onChange = {(e)=>billingStreetAddressHandler(e.target.value)}/>
  //               <input type="text" htmlFor='city' name="city" id="city" onChange = {(e)=>billingCityHandler(e.target.value)}/>
  //               <input type="text" htmlFor='state' name="state" id="state" onChange = {(e)=>billingStateHandler(e.target.value)}/>
  //               <input type="text" htmlFor='zipcode' name="zipcode" id="zipcode"  onChange = {(e)=>billingZipcodeHandler(e.target.value)}/>
  //     </div>
  //   </div>
  // </div>
  // )

  // let billingSameAsMailing = "true"
  
  // const [isBillMail, setIsBillMail] = useState()

  // const billingIsMailing = (e) => {
  //   billingSameAsMailing = e
  //   if(billingSameAsMailing==="true"){
  //     console.log(billingSameAsMailing)
  //     setIsBillMail()
  //   }else{
  //     setIsBillMail(BillingNotMailing)
  //   }
  // }

  const onSubmitHandler = (e) => {
    console.log(addressBilling,"billing")
    console.log(addressMailing,"mailing")
    e.preventDefault();
    axios.post('http://localhost:8000/api/customer', {
      firstName,
      middleName,
      lastName,
      addressMailing,
      addressBilling:addressBilling || addressMailing,
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

  let streetAddressInput = document.getElementById('streetAddress')
  let cityInput = document.getElementById('city')
  let stateInput = document.getElementById('state')
  let zipcodeInput = document.getElementById('zipcode')

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

  let billingStreetAddressInput = document.getElementById('streetAddress')
  let billingCityInput = document.getElementById('city')
  let billingStateInput = document.getElementById('state')
  let billingZipcodeInput = document.getElementById('zipcode')

  const billingStreetAddressHandler = (e) => {
    setAddressBilling({...addressBilling, streetAddress:e})
  }
  const billingCityHandler = (e) => {
    setAddressBilling({...addressBilling,city:e})
  }
  const billingStateHandler = (e) => {
    setAddressBilling({...addressBilling,state:e})
  }
  const billingZipcodeHandler = (e) => {
    e = Number(e)
    setAddressBilling({...addressBilling,zipcode:e})
  }



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
                    <input type="radio" onClick={()=>setBillingSame(true)} name='billingSameAsMailing' id="yes" value="true" defaultChecked="default"/>
                    <label htmlFor="no">No</label>
                    <input type="radio" onClick={()=>setBillingSame(false)} name='billingSameAsMailing' id="no" value="false"/>
                </div>

            {
            billingSame?
              null:  <div>
              <h2>Billing address</h2>
              <div className={styles.addresses}>
                <div className={styles.labels}>
                  <label htmlFor="streetAddress">Street address</label>
                  <label htmlFor="city">City</label>
                  <label htmlFor="state">State</label>
                  <label htmlFor="zipcode">Zipcode</label>
                </div>
          
                <div className={styles.inputs}>
                          <input type="text" htmlFor='streetAddress' name="streetAddress" id="streetAddress"  onChange = {(e)=>billingStreetAddressHandler(e.target.value)}/>
                          <input type="text" htmlFor='city' name="city" id="city" onChange = {(e)=>billingCityHandler(e.target.value)}/>
                          <input type="text" htmlFor='state' name="state" id="state" onChange = {(e)=>billingStateHandler(e.target.value)}/>
                          <input type="text" htmlFor='zipcode' name="zipcode" id="zipcode"  onChange = {(e)=>billingZipcodeHandler(e.target.value)}/>
                </div>
              </div>
            </div>
            }


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