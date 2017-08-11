import React from 'react'
import Strings from '../localization'
import { Header, Segment, Button, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import AuthHeader from './user/AuthHeader'

class AppHeader extends React.Component {
  render() {
    return <Segment className='app__header'>
      <Header className='app__header__title'>{Strings.rahnamaSystem}</Header>
      <Grid>
        <Grid.Row>
          <AuthHeader/>
          {location.pathname !== '/' && <div className='app__header__return'>

            <Link to='/'><Button color='green'>{Strings.bakToHome}</Button></Link>
             {/*<img src="../../Images/RAH_logo.png" alt="Smiley face" height="42" width="42">*/}
          </div>
          }
          {location.pathname === '/' && <div className='app__header__training' color="red">
            <Link to='/'><Button color="red" >{Strings.training}</Button></Link>
          </div>}
        </Grid.Row>
      </Grid>
    </Segment>
  }
}

export default AppHeader
