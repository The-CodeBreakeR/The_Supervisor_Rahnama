import React from 'react'
import Strings from '../localization'
import { Header, Segment } from 'semantic-ui-react'

import AuthHeader from './user/AuthHeader'

class AppHeader extends React.Component {
  render() {
    return <Segment className='app__header'>
      <Header className='app__header__title'>{Strings.rahnamaSystem}</Header>
      <AuthHeader/>
    </Segment>
  }
}

export default AppHeader
