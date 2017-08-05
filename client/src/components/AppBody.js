import React from 'react'
import { Route } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'

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

class AppBody extends React.Component {
  render() {
    return <Segment className='app__body'>
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
    </Segment>
  }
}

export default AppBody
