import React from 'react'

import LogoText from 'uikit/LogoText'
import PageTitle from 'uikit/PageTitle'
import PageIndicator from 'uikit/PageIndicator'

import s from './LeftNav.module.css'

const LeftNav = () => {
  return (
  <nav className={s.nav}>
    <LogoText/>
    <span className={s.branding}>freelance web development</span>

    <div className={s.bottomWrapper}>
      <PageTitle className={s.pageTitle}/>
      <PageIndicator/>
    </div>
  </nav>
  )
}



export default LeftNav