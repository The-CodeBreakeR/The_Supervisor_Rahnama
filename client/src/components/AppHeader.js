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
          {location.pathname !== '/' &&<div> <Link to='/'><Button color='green'>{Strings.bakToHome}</Button></Link></div>}
        </Grid.Row>
      </Grid>
    </Segment>
  }
}

export default AppHeader
