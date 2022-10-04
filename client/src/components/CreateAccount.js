import React from 'react'
import NonUserNavBar from './NonUserNavBar'
import styles from '../styles/CreateAccount.module.css'



const CreateAccount = () => {

  return (
    <div>
      <NonUserNavBar/>
      <div className={styles.createContainer}>

        <h1>Create a new account</h1>

          <form action="" className={styles.form}>
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
                <input type="text" htmlFor='firstName' name="firstName" id="firstName" />          
                <input type="text" htmlFor='middleName' name="middleName" id="middleName" />
                <input type="text" htmlFor='lastName' name="lastName" id="lastName" />
                <input type="text" htmlFor='socialSecurityNumber' name="socialSecurityNumber" id="socialSecurityNumber" />
                <input type="text" htmlFor='email' name="email" id="email" />
                <input type="text" htmlFor='phoneNumber' name="phoneNumber" id="phoneNumber" />
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
                <input type="text" htmlFor='streetAddress' name="streetAddress" id="streetAddress" />
                <input type="text" htmlFor='city' name="city" id="city" />
                <input type="text" htmlFor='state' name="state" id="state" />
                <input type="text" htmlFor='zipcode' name="zipcode" id="zipcode" />
              </div>
            </div>


              <p>Is your billing address the same as the mailing address?</p>
                <div className={styles.radioBtns}>
                    <label htmlFor="yes">Yes</label>
                    <input type="radio" name='billingSameAsMailing' id="yes" value="true" checked="checked"/>
                    <label htmlFor="no">No</label>
                    <input type="radio" name={billingSameAsMailing} id="no" value="false"/>
                </div>

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


            <h2>Login information</h2>
            <div className={styles.personInfo}>
              <div className={styles.labels}>
                <label htmlFor="username">Username</label>
                <label htmlFor="password">Password</label>
                <label htmlFor="confirmPassword">Confirm password</label>
              </div>

              <div className={styles.inputs}>
                <input type="text" htmlFor='username' name="username" id="username" />
                <input type="text" htmlFor='password' name="password" id="password" />
                <input type="text" htmlFor='confirmPassword' name="confirmPassword" id="confirmPassword" />
              </div>
            </div>
            <button>Submit information</button>
          </form>
      </div>
    </div>
  )
}

export default CreateAccount