import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import NonUserNavBar from './NonUserNavBar'
import styles from '../styles/LandingPage.module.css'
import familySavingMoney from '../img/familyBanking.jpeg'
import {useNavigate, Link} from "react-router-dom";
import {CustomerContext} from '../context/CustomerContextProvider'



const LandingPage = ({setLoggedIn}) => {
  const navigate= useNavigate()
  const {state,dispatch} = useContext(CustomerContext);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(()=>{
      console.log("current state")
      console.log(state)
      state.customer && navigate('/accounts')
    },[state.customer])


  const submitHandler = (e)=>{
      e.preventDefault()

      axios.post('http://localhost:8000/api/login',{
      username,
      password}
      ,{withCredentials:true})
      .then((res)=>{
          dispatch({
              type:"SET_CUSTOMER",
              payload:res.data.customer
          })
          
          setLoggedIn(true)
          console.log("updated current state")
          console.log(state)
          navigate('/accounts')
      })
      .catch((err)=>{
          console.log(err)
      })
  }


  return (
    <div className={styles.landingPageContainer}>
      <NonUserNavBar/>

      <div className={styles.mask}>
        <img className={styles.intImg} src={familySavingMoney} alt="Family saving money" />
      </div>

      <div className={styles.landingPageContent}>

        <div className={styles.leftSide}>
          <h2>Start building your future.</h2>
          <div className={styles.imagesAndText}>
              <p>Find what you need to help reach your goals.</p>
            </div>
            <Link to="/create"><button>Sign Up!</button></Link>
        </div>

        <div className={styles.rightSide}>
          <h2>Welcome back</h2>
          <form onSubmit={submitHandler}>

              <label className={styles.inputFieldLabel} htmlFor="username">Username</label>
            <div>
              <input type="text" name="username" id="username" value={username} onChange = {(e)=>setUsername(e.target.value)}/>
            </div>

              <label className={styles.inputFieldLabel} htmlFor="password">Password</label>
            <div>              
              <input type="text" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <button type="submit">Login</button>
          </form>

          <a className={styles.signUpLink}><Link to="/create">Not enrolled? Sign up now!</Link></a>
        </div>

      </div>

    </div>
  )
}

export default LandingPage