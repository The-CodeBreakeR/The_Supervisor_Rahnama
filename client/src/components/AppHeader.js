import React from 'react'
import Strings from '../localization'
import { Header, Segment } from 'semantic-ui-react'
import LogoInfo from './LogoInfo.js'
import VideoTraining from './VideoTraining.js'
import Timer from './Timer.js'

class AppHeader extends React.Component {
  componentWillMount() {
    this.timerRef = setInterval(() => this.forceUpdate(), 1000)
  }


  render() {
    return <Segment className='app__header'>
      <LogoInfo/>
      <div style={ { marginLeft: '8px' } }>
        <Header className='app__header__title'>{Strings.rahnamaSystem}</Header>
      </div>
      <Timer/>
      {location.pathname === '/' && <VideoTraining/>}
    </Segment>
  }
}

export default AppHeader
