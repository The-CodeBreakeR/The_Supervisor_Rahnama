import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

import RegistrationModal from './user/RegistrationModal'

export default function AppHeader() {
  return <Segment className='app__header'>
    <Header>سامانه‌ی رهنما</Header>
    <RegistrationModal/>
  </Segment>
}
