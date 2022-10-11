import {React, useState} from 'react'
import styles from '../styles/NonUserNavBar.module.css'
import {FaBars, FaTimes} from 'react-icons/fa'
import bankLogo from '../img/jasebanklogo.jpeg'

const NonUserNavBar = () => {
  const [click, setClick] = useState(false)

  const handleClick = () => {
    console.log(click)
    setClick(!click)
}

  

  

  return (
    <div className={styles.NonUserNavBar}>
        <ul className={click ? styles.activeNavMenu:styles.NavBarList}>
            <li><a className={styles.linker} href="/"><img className={styles.logo} src={bankLogo} alt="Jase Bank Logo" /></a></li>
            <li><a className={styles.linker} href="/">Checking</a></li>
            <li><a className={styles.linker} href="/">Savings</a></li>
            <li><a className={styles.linker} href="/">Credit Cards</a></li>
            <li><a className={styles.linker} href="/">About Us</a></li>
        </ul>
        <div className={styles.hamburger} onClick={handleClick}>
            {
                (<FaBars size={20} style={{color:'#fff'}}/>)
            }
        </div>
    </div>
  )
}

export default NonUserNavBar