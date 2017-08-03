import React from 'react'
import { Route } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'

import ToursHome from './tours/ToursHome'
import SkillHome from './skill/SkillHome'

class AppBody extends React.Component {
  render() {
    return <Segment className='app__body'>
      <Route path="/tours" component={ToursHome}/>
      <Route path="/skill" component={SkillHome}/>
    </Segment>
  }
}

export default AppBody
