import React from 'react'

import MomentJ from 'moment-jalaali'

import AppHeader from './AppHeader'
import AppBody from './AppBody'

MomentJ.loadPersian()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
    }
  }
  render() {
    return <div className='app'>
      <AppHeader setLogin={state => this.setState({'loggedIn': state}) }/>
      <AppBody setLogin={state => this.setState({'loggedIn': state}) }/>
    </div>
  }
}

export default App
