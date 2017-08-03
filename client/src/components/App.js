import React from 'react'
import MomentJ from 'moment-jalaali'

import AppHeader from './AppHeader'
import AppBody from './AppBody'

MomentJ.loadPersian()

class App extends React.Component {
  render() {
    return <div className='app'>
      <AppHeader/>
      <AppBody/>
    </div>
  }
}

export default App
