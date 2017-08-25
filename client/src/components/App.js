import React from 'react'

import MomentJ from 'moment-jalaali'

import AppHeader from './AppHeader'
import AppBody from './AppBody'
import AppMenu from './AppMenu'
import { getUser } from './user/utils'

MomentJ.loadPersian()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: !!getUser(),
    }
  }
  render() {
    return <div className='app'>
      <AppHeader setLogin={state => this.setState({'loggedIn': state}) }/>
      {this.state.loggedIn && <div className='app__app-menu'>
        <AppMenu/>
      </div>}
      <AppBody setLogin={state => this.setState({'loggedIn': state}) }/>

    </div>
  }
}

export default App
