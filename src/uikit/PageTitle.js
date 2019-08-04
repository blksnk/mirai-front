import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { pageTitleSet } from 'store/actions/actions'

import g from './uikit.module.css'

const mapStateToProps = ({ pageTitle }) => ({ storeTitle: pageTitle })

const PageTitle = ({ className, history, storeTitle, dispatch }) => {

  history.listen((location) => {
    const t = location.pathname.split('/')[1]
    if(storeTitle !== t) {
      if(t === '') {
        dispatch(pageTitleSet('home'))
      } else {
        dispatch(pageTitleSet(t))
      }
    }
  })



  return <span className={`${g.pageTitle} ${className}`}>{storeTitle}</span>
}

export default connect(mapStateToProps)(withRouter(PageTitle))