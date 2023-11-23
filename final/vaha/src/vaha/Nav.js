import React from 'react'
import styles from './vaha.module.css'
import githubLogo from '../assets/github.svg'

export default function Nav() {    
    return(
    <div className={styles.nav}>
        <a className={styles.logo} href="https://github.com/zxxwxyyy/VAHA" >
          <img className={styles.logo} alt="" src={githubLogo}/>
        </a>
        <div className={styles.vaha_title}>
          <h2>VAHA - Visual Artwork for Human Affections</h2>
        </div>
    </div>
    );
}