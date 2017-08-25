import React from 'react'
import Strings from '../localization'
import { Link } from 'react-router-dom'
import { Button, Grid } from 'semantic-ui-react'
import Subsystem from './Subsystem'
class MainPanel extends React.Component {
  render() {
    return <Grid className='mainpanel'>
      <Grid.Row>
        <Subsystem name='Doc'/>
        <Subsystem name='Intern'/>
     </Grid.Row>
      <Grid.Row>
        <Subsystem name='Bill'/>
        <Subsystem name='Accom'/>
      </Grid.Row>
      <Grid.Row>
        <Subsystem name='Tour'/>
        <Subsystem name='Skill'/>
      </Grid.Row>
      <Grid.Row>
        <Subsystem name='Timing'/>
        <Subsystem name='Scheduling'/>
      </Grid.Row>
    </Grid>
  }
}

export default MainPanel
