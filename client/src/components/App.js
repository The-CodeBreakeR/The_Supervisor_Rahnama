import React from 'react'
import {Route, Link} from 'react-router-dom'

import AppHeader from './AppHeader'

class App extends React.Component {
  render() {
    return <div className='app'>
      <AppHeader/>
      <Route path='/test' component={AppHeader}/>
    </div>
  }
}

export default App
