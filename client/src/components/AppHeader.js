import React from 'react'
import Strings from '../localization'
import { Header, Segment, Button, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import rahLogo from '../../asset/RAH_logo.png'
import AuthHeader from './user/AuthHeader'

class AppHeader extends React.Component {
  render () {
    console.log()
    return <Segment className='app__header'>
      <Grid>
        <Grid.Column className='app__header__column__logo'>
          {/*<img src='../../asset/RAH_logo.png'  alt="Smiley face" />*/}
          <Image
            // mode='fit'
            src={rahLogo}
            // wrapped
            width={32}
            height={32}
            alt={"no Image load"}
          />
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
