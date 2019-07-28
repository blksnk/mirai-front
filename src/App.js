import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import 'stylesheets/root.css'
import 'stylesheets/darkmode.css'
import './App.css'

import Projects from 'views/Projects'
import About from 'views/About'
import Contact from 'views/Contact'

import LeftNav from 'uikit/LeftNav'
import RightNav from 'uikit/RightNav'

const App = ({ darkMode }) => {
  return (
  <div className='App'>
    <div className='navLeftWrapper'>
      <LeftNav/>
    </div>

    <div className='middle'>
      <div className={`contentContainer ${darkMode ? 'dark' : 'light'}`}>
        <Switch>
          <Route path='/projects' component={Projects}/>
          <Route path='/about' component={About}/>
          <Route path='/contact' component={Contact}/>
        </Switch> 
      </div>

      <GridLines darkMode={darkMode}/>
    </div>

    <div className='navRightWrapper'>
      <RightNav/>
    </div>
  </div>
)}

const GridLines = ({ darkMode }) => 
<div className={`linesWrapper ${darkMode ? 'dark' : 'light'}`}>
  <div className='gridLine'></div>
  <div className='gridLine'></div>
  <div className='gridLine'></div>
  <div className='gridLine'></div>
  <div className='gridLine'></div>
</div>


const mapStateToProps = ({ darkMode }) => ({ darkMode })

export default connect(mapStateToProps)(App)
