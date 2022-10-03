import React from 'react'
import styles from '../styles/NonUserNavBar.module.css'

const NonUserNavBar = () => {
  return (
    <div className={styles.NonUserNavBar}>
        <ul className={styles.NavBarList}>
            <li>Jase Logo</li>
            <li><a href="/">Checking</a></li>
            <li><a href="/">Savings</a></li>
            <li><a href="/">Credit Cards</a></li>
            <li><a href="/">About Us</a></li>
        </ul>
    </div>
  )
}

export default NonUserNavBar