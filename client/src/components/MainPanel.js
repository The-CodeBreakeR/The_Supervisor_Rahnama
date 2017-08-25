import React from 'react'
import Strings from '../localization'
import { Link } from 'react-router-dom'

import { Button, Grid, Icon } from 'semantic-ui-react'
import Subsystem from './Subsystem'

class MainPanel extends React.Component {
  render() {
    const user = this.props.user
    const userGender = user && user.gender
    const userPrefix = userGender === 'F' ? Strings.mrs : Strings.mr
    const userName = user && `${user.first_name} ${user.last_name}`

    return (user.personal_profile && user.educational_profile)
      ? <div>
          <div>
            <Icon name='user' size='massive' />
            <div>{`${userPrefix} ${userName}`}</div>
          </div>
          <Grid className='mainpanel'>
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
        </div>
      : <div className='main-panel__not-registered'>
        <p className='main-panel__not-registered__text'>{userName}
          {Strings.notRegistered}
        </p>
        <div className='main-panel__profile-button'>
          <Link to='/profile'>
            <Button size='huge' primary>{Strings.profilesub}</Button>
          </Link>
        </div>
      </div>
  }
}

export default MainPanel
