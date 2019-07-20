import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import g from './uikit.module.css'

const mapStateToProps = ({ pageIndicator }) => {
  const {total, current} = pageIndicator
  return {total, current}
}

const PageIndicator = ({ className, history, total, current }) => {
  return (
    <div className={`${g.pageIndicator} ${className}`}>
      <span>{formatNumber(current)}</span>
      <div className={g.pageIndicatorSeparator}></div>
      <span>{formatNumber(total)}</span>
    </div>
  )
}

const formatNumber = n => {
  const number = Number(n)
  if(number < 10) {
    return '0' + String(number)
  } else {
    return String(number)
  }
}

export default connect(mapStateToProps)(withRouter(PageIndicator))