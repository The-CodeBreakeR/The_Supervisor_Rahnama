import React from 'react'

import MomentJ from 'moment-jalaali'

import { Dimmer, Loader } from 'semantic-ui-react'
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
      user: null,
    }
    this.updateUser()
  }

  updateUser() {
    const user = getUser()
    if (!user) {
      this.setState({ user: null })
    } else {
      fetch(`/api/user/${user.id}/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(result => this.setState({ user: result }))
    }
  }

  render() {
    return (!this.state.loggedIn || this.state.user)
      ? <div className='app'>
        <AppHeader setLogin={state => {
          this.setState({'loggedIn': state})
          this.updateUser()
        }}/>
        {this.state.loggedIn && <div className='app__app-menu'>
          <AppMenu
            user={this.state.user}
            setLogin={state => {
              this.setState({'loggedIn': state})
              this.updateUser()
            }}
          />
        </div>}
        <AppBody
          setLogin={state => {
            this.setState({'loggedIn': state})
            this.updateUser()
          }}
          loggedIn={this.state.loggedIn}
          updateProfile={() => this.updateUser()}
          user={this.state.user}
        />
      </div>
      : <Dimmer inverted active><Loader inverted active /></Dimmer>
  }
}

export default App
