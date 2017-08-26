import React from 'react'
import Strings from '../localization'
import { Header, Grid } from 'semantic-ui-react'
import LogoInfo from './LogoInfo.js'
import Timer from './Timer.js'
class AppHeader extends React.Component {
  componentWillMount() {
    this.timerRef = setInterval(() => this.forceUpdate(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerRef)
  }

  render() {
    return <div className='app__header'>
      <Grid>
        <Grid.Row className='Row__header'>
          <div className='whole-header'>
            <div className='right-header'>
              <div style={{ width: '160px' }}><LogoInfo/></div>
              <div style={{ marginLeft: '8px' }}>
                <Header className='app__header__title'>{Strings.rahnamaSystem}</Header>
              </div>
            </div>
            <Timer/>
          </div>
        </Grid.Row>
      </Grid>
    </div>
  }
}

export default AppHeader
