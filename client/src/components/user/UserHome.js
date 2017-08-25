import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import ProfileButtons from './ProfileButtons'
import PersonalProfile from './PersonalProfile'
import EducationalProfile from './EducationalProfile'

class UserHome extends React.Component {
  render() {
    const { history, updateProfile } = this.props
    return <Switch>
      <Route exact path='/profile' component={ProfileButtons}/>
      <Route path='/profile/personal' render={() => <PersonalProfile updateProfile={updateProfile} history={history} />}/>
      <Route path='/profile/educational' render={() => <EducationalProfile updateProfile={updateProfile} history={history}/>}/>
    </Switch>
  }
}

const withRouterUserHome = withRouter(UserHome)

export default withRouterUserHome
