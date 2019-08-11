import React from 'react'

import s from './Presentation.module.css'

import Logo from 'uikit/Logo'
import Button from 'uikit/Button'
import tower from 'assets/images/tower.jpg'

const Presentation = ({ history }) => {

  return (
    <React.Fragment>
      <div className={s.illuWrapper}>  
        <img src={tower} className={s.img} alt=""/>
      </div>
    </React.Fragment>
  )
}

export default Presentation