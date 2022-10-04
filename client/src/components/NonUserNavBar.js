import React from 'react'
import styles from '../styles/NonUserNavBar.module.css'
import bankLogo from '../img/jasebanklogo.jpeg'

const NonUserNavBar = () => {
  return (
    <div className={styles.NonUserNavBar}>
        <ul className={styles.NavBarList}>
            <li><a href="/"><img src={bankLogo} alt="Jase Bank Logo" /></a></li>
            <li><a href="/">Checking</a></li>
            <li><a href="/">Savings</a></li>
            <li><a href="/">Credit Cards</a></li>
            <li><a href="/">About Us</a></li>
        </ul>
    </div>
  )
}

export default NonUserNavBar