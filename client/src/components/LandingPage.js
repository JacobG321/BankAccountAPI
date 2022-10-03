import React from 'react'
import NonUserNavBar from './NonUserNavBar'
import styles from '../styles/LandingPage.module.css'

const LandingPage = () => {
  return (
    <div>
      <NonUserNavBar/>
      <div className={styles.landingPageContainer}>
        <div className={styles.leftSide}>
          <h2>Start building your future.</h2>
          <div className={styles.imagesAndText}>
              <img src="" alt="" />
              <p>Find what you need to help reach your goals.</p>
              <img src="" alt="" />
            </div>
            <button>Sign Up!</button>
        </div>
        <div className={styles.rightSide}>
          <h2>Welcome back</h2>
          <form action="">
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" />
            </div>
            <div>              
              <label htmlFor="password">Password</label>
              <input type="text" name="password" id="password" />
            </div>
            <button type="submit">Sign in</button>
          </form>
          <a href="/">Not enrolled? Sign up now!</a>
        </div>
      </div>

    </div>
  )
}

export default LandingPage