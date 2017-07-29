import React from 'react'
import Cookie from 'browser-cookies'
import Strings from '../../localization'

import RegistrationModal from './RegistrationModal'
import LoginModal from './LoginModal'

class AuthHeader extends React.Component {
  logout() {
    Cookie.erase('token')
    this.forceUpdate()
  }

  render() {
    const loggedIn = !!Cookie.get('token')
    const user = loggedIn && localStorage.getItem('user')
    const name = (user && user.name) ? user.name : Strings.user
    return <div className='app__header__auth'>
      {!loggedIn
        ? <div className='app__header__auth--guest'>
          <LoginModal onLogin={() => this.forceUpdate()} />
          <RegistrationModal onLogin={() => this.forceUpdate()} />
        </div>
        : <div className='app__header__auth--user'>
          {`${name} ${Strings.welcomeDear}`}&nbsp;
          (<a className='link' onClick={() => this.logout()}>{Strings.logout}</a>)
        </div>
      }
    </div>
  }
}

export default AuthHeader
