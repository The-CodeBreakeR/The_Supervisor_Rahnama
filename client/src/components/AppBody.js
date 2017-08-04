import React from 'react'
import { Route } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'

import AccommHome from './accomm/AccommHome'
import ToursHome from './tours/ToursHome'
import SkillHome from './skill/SkillHome'
import AccountHome from './account/AccountHome'

class AppBody extends React.Component {
  render() {
    return <Segment className='app__body'>
      <Route path='/tours' component={ToursHome}/>
      <Route path='/skill' component={SkillHome}/>
      <Route path='/accounting' component={AccountHome}/>
      <Route path='/accommodation' component={AccommHome}/>
    </Segment>
  }
}

export default AppBody
