import React from 'react'
import Route from 'react-router-dom'
import MomentJ from 'moment-jalaali'

import AppHeader from './AppHeader'
import AccommHome from './accomm/AccommHome'
MomentJ.loadPersian()

class App extends React.Component {
  render() {
    return <div className='app'>
      <AppHeader/>
      <Route path='/accommodation' component={AccommHome}/>
      <Route path='/test' component={AppHeader}/>
    </div>
  }
}

export default App
