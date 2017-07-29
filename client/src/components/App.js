import React from 'react'
import {Route, Link} from 'react-router-dom'
import MomentJ from 'moment-jalaali'

import AppHeader from './AppHeader'
import ToursHome from './tours/ToursHome'

MomentJ.loadPersian()

class App extends React.Component {
  render() {
    return <div className='app'>
      <AppHeader/>
      <Route path="/tours" component={ToursHome}/>
    </div>
  }
}

export default App
