import React from 'react'

import { Header, Segment } from 'semantic-ui-react'

import AuthHeader from './user/AuthHeader'

class AppHeader extends React.Component {
  render() {
    return <Segment className='app__header'>
      <Header>سامانه‌ی رهنما</Header>
      <AuthHeader/>
    </Segment>
  }
}

export default AppHeader
