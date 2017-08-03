import React from 'react'
import { Route } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import ToursHome from './tours/ToursHome'
import SkillHome from './skill/SkillHome'
import TimingHome from './timing/TimingHome'
import SchedulingPage from './scheduling/SchedulingPage'
class AppBody extends React.Component {
  render() {
    return <Segment className='app__body'>
      <Route path="/tours" component={ToursHome}/>
      <Route path="/skill" component={SkillHome}/>
      <Route path="/scheduling" component={SchedulingPage}/>
      <Route path="/timing" component={TimingHome}/>
    </Segment>
  }
}

export default AppBody
