import React from 'react'
import NonUserNavBar from './NonUserNavBar'
import styles from '../styles/LandingPage.module.css'
import familySavingMoney from '../img/familyBanking.jpeg'

const LandingPage = () => {
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
            <a href="/create">
              <button>Sign Up!</button>
            </a>
        </div>
        <div className={styles.rightSide}>
          <h2>Welcome back</h2>
          <form action="">
              <label className={styles.inputFieldLabel} htmlFor="username">Username</label>
            <div>
              <input type="text" name="username" id="username" />
            </div>
              <label className={styles.inputFieldLabel} htmlFor="password">Password</label>
            <div>              
              <input type="text" name="password" id="password" />
            </div>
            <button type="submit">Login</button>
          </form>
          <a className={styles.signUpLink} href="/create">Not enrolled? Sign up now!</a>
        </div>

      </div>

    </div>
  )
}

export default LandingPage