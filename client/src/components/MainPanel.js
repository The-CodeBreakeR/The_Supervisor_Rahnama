import React from 'react'
import Strings from '../localization'
import { getUser } from './user/utils'
import { Link } from 'react-router-dom'
import { Button, Grid, Dimmer, Loader, Icon } from 'semantic-ui-react'

class MainPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: null }
  }

  componentWillMount() {
    const user = getUser()
    fetch(`/api/user/${user.id}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => this.setState({ user: result }))
  }

  render() {
    const user = this.state.user
    const userGender = this.state.user && this.state.user.gender
    const userPrefix = userGender === 'F' ? Strings.mrs : Strings.mr
    const userName = user && `${user.first_name} ${user.last_name}`

    return user
      ? (user.personal_profile && user.educational_profile)
        ? <div>
            <div>
              <Icon name='user' size='massive' />
              <div>{`${userPrefix} ${userName}`}</div>
            </div>
            <Grid className='mainpanel'>
              <Grid.Row>
                <Link to='/profile'><Button className='mainpanel__button' primary>{Strings.profilesub}</Button></Link>
                <Link to='/internship'><Button className='mainpanel__button' primary>{Strings.internshipsub}</Button></Link>
              </Grid.Row>
              <Grid.Row>
                <Link to='/accounting'><Button className='mainpanel__button' primary>{Strings.accountingsub}</Button></Link>
                <Link to='/accommodation'><Button className='mainpanel__button'
                                                  primary>{Strings.accommodationsub}</Button></Link>
              </Grid.Row>
              <Grid.Row>
                <Link to='/tours'><Button className='mainpanel__button' primary>{Strings.toursub}</Button></Link>
                <Link to='/skill'><Button className='mainpanel__button' primary>{Strings.skillsub}</Button></Link>
              </Grid.Row>
              <Grid.Row>
                <Link to='/timing'><Button className='mainpanel__button' primary>{Strings.timingsub}</Button></Link>
                <Link to='/scheduling'><Button className='mainpanel__button' primary>{Strings.schedulingsub}</Button></Link>
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
      : <Dimmer inverted active><Loader inverted active /></Dimmer>
  }
}

export default MainPanel
