import React from 'react'
import { Waypoint } from 'react-waypoint'
import { connect } from 'react-redux'
import { indicatorSet, indicatorSetCurrent } from 'store/actions/actions'

import g from 'uikit/uikit.module.css'

const mapStateToProps = ({ pageIndicator }) => ({ pageIndicator })

const PageSection = ({ first, total, current, pageIndicator, dispatch, horizontal, className, ...props }) => {
  const ifNeeded = (f, c) => {
    if(c !== pageIndicator.current) {
      dispatch(f(c))
    }
  }
  let w
  if(first) {
    w = <Waypoint horizontal={horizontal || false} onEnter={() => dispatch(indicatorSet(1, total))}></Waypoint>
  } else {
    w = <Waypoint horizontal={horizontal || false} onEnter={() => ifNeeded(indicatorSetCurrent, current)}></Waypoint>
  }
  return <div className={`${g.pageSection} ${className}`}>{w}</div>
}


export default connect(mapStateToProps)(PageSection)