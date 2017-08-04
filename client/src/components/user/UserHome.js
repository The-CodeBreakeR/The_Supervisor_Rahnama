import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProfileButtons from './ProfileButtons'
import PersonalProfile from './PersonalProfile'

class UserHome extends React.Component {
  render() {
    return <Switch>
      <Route exact path='/profile' component={ProfileButtons}/>
      <Route path='/profile/personal' component={PersonalProfile}/>
    </Switch>
  }
}

export default UserHome
