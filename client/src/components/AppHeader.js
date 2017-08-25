import React from 'react'
import Strings from '../localization'
import { Header, Segment } from 'semantic-ui-react'
import LogoInfo from './LogoInfo.js'
import VideoTraining from './VideoTraining.js'

class AppHeader extends React.Component {
  render() {
    return <Segment className='app__header'>
      <LogoInfo/>
      <div style={ { marginLeft: '8px' } }>
        <Header className='app__header__title'>{Strings.rahnamaSystem}</Header>
      </div>
      {location.pathname === '/' && <VideoTraining/>}
    </Segment>
  }
}

export default AppHeader
