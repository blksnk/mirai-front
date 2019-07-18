import React from 'react'
import { Switch, Route } from 'react-router-dom'
import 'stylesheets/root.css'
import './App.css'
import Projects from 'views/Projects'

import LeftNav from 'uikit/LeftNav'
import RightNav from 'uikit/RightNav'

const App = () => (
  <div className='App'>
    <div className='navLeftWrapper'>
      <LeftNav/>
    </div>

    <div className='middle'>
      <div className='contentContainer'>

      {/*<Switch>
        <Route path='/' component={Projects}/>
      </Switch>*/}
        
      </div>

      <GridLines/>
    </div>

    <div className='navRightWrapper'>
      <RightNav/>
    </div>
  </div>
)

const GridLines = () => <div className='linesWrapper'>
  <div className='gridLine'></div>
  <div className='gridLine'></div>
  <div className='gridLine'></div>
  <div className='gridLine'></div>
  <div className='gridLine'></div>
</div>




export default App
