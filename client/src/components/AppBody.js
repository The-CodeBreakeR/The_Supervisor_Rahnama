import React from 'react'
import { Route } from 'react-router-dom'
import { Segment,Grid,Header } from 'semantic-ui-react'

import UserHome from './user/UserHome'
import AccommHome from './accomm/AccommHome'
import ToursHome from './tours/ToursHome'
import SkillHome from './skill/SkillHome'
import TimingHome from './timing/TimingHome'
import SchedulingPage from './scheduling/SchedulingPage'
import AccountHome from './account/AccountHome'
import InternshipHome from './internship/InternshipHome'
import CompanyList from './internship/CompanyList'
import MainPanel from './MainPanel'

import Cookie from 'browser-cookies'

import Strings from '../localization'
import RegistrationModal from './user/RegistrationModal'
import LoginModal from './user/LoginModal'
class AppBody extends React.Component {
  render() {
    const loggedIn = !!Cookie.get('token')
    return <Segment className='app__body'>
    {!loggedIn
        ? <div className='app__auth__guest'>
        <Grid>
          <Grid.Column>
          <Header>{Strings.loginWelcome}</Header>
          <p>{Strings.loginInfo}</p>
            <br/>
            <br/>
            <Grid.Row>
              <RegistrationModal onLogin={() => this.forceUpdate()}/>
              <LoginModal onLogin={() => this.forceUpdate()}/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
        :
      <div>
        <Route exact path='/' component={MainPanel}/>
        <Route path='/profile' component={UserHome}/>
        <Route path='/tours' component={ToursHome}/>
        <Route path='/skill' component={SkillHome}/>
        <Route path='/scheduling' component={SchedulingPage}/>
        <Route path='/timing' component={TimingHome}/>
        <Route path='/accounting' component={AccountHome}/>
        <Route path='/accommodation' component={AccommHome}/>
        <Route exact path='/internship' component={InternshipHome}/>
        <Route path='/internship/companies' component={CompanyList}/>
        </div>
    }</Segment>
  }
}

export default AppBody
