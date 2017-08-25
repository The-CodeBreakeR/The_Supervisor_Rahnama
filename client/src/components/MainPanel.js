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
    return this.state.user
      ? <div>
          <div>
            <Icon name='user' size='massive' />
            <div>{this.state.user.name}</div>
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
      : <Dimmer inverted active><Loader inverted active /></Dimmer>
  }
}

export default MainPanel
