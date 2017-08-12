import React from 'react'
import Strings from '../localization'
import { Header, Segment, Button, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import AuthHeader from './user/AuthHeader'
import LogoInfo from './LogoInfo.js'

class AppHeader extends React.Component {
  render () {
    console.log()
    return <Segment className='app__header'>
      <Grid>
        <Grid.Column>
          <LogoInfo/>
        </Grid.Column>
        <Grid.Column className='app__header__column'>
          <Grid.Row>
            <Header className='app__header__title'>{Strings.rahnamaSystem}</Header>
          </Grid.Row>
          <Grid.Row>
            <AuthHeader/>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column className='app__header__column__return'>
          {location.pathname !== '/' && <div className='app__header__return'>
            <Link to='/'><Button color='green'>{Strings.bakToHome}</Button></Link>
          </div>
          }
          {location.pathname === '/' && <div className='app__header__training' color="red">
            <Link to='/'><Button color="red">{Strings.training}</Button></Link>
          </div>}
        </Grid.Column>
      </Grid>
    </Segment>
  }
}

export default AppHeader
