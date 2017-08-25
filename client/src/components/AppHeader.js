import React from 'react'
import Strings from '../localization'
import { Header, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import AuthHeader from './user/AuthHeader'
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
        <AuthHeader setLogin={state => this.props.setLogin(state) }/>
      </div>
      <Timer/>
      {location.pathname === '/' && <VideoTraining/>}
    </Segment>
  }
}

export default AppHeader
