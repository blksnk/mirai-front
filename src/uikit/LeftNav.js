import React from 'react'

import LogoText from 'uikit/LogoText'

import s from './LeftNav.module.css'

const LeftNav = () => {
  return (
  <nav className={s.nav}>
    <LogoText/>
    <span className={s.branding}>freelance web development</span>
  </nav>
  )
}



export default LeftNav