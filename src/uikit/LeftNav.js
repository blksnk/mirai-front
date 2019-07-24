import React from 'react'
import { withRouter } from 'react-router-dom'

import Logo from 'uikit/Logo'
import PageTitle from 'uikit/PageTitle'
import PageIndicator from 'uikit/PageIndicator'

import s from './LeftNav.module.css'

const LeftNav = ({ history }) => {
  return (
  <nav className={s.nav}>
    <Logo vertical history={history}/>
    <span className={s.branding}>freelance web development</span>
    <ContactRedirect history={history}/>

    <div className={s.bottomWrapper}>
      <PageTitle className={s.pageTitle}/>
      <PageIndicator/>
    </div>
  </nav>
  )
}

const ContactRedirect = ({ history }) => (
  <a href='/contact' className={s.email} onClick={e => {
    e.preventDefault()
    if(window.location.pathname !== '/contact') {
      history.push('/contact')
  }}}>hello.mirai.dev@gmail.com</a>
)

export default withRouter(LeftNav)