import React from 'react'

import SchedulingList from './SchedulingList'
import SchedulingRequest from './SchedulingRequest'
import SchedulingSearch from './SchedulingSearch'
import SchedulingWeek from './SchedulingWeek'
import SchedulingMonth from './SchedulingMonth'
import HardDayModal from './HardDayModal'
import SchedulingToday from './SchedulingToday'
import Strings from '../../localization'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

class SchedulingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schedulingList: [],
    }
  }

  componentWillMount() {
    fetch('/scheduling/search/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '',
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 0) {
          this.setState({schedulingList: result.scheduling})
        }
      })
  }

  setSchedulingList(schedulingList) {
    this.setState({schedulingList: schedulingList})
  }

  render() {
    console.log('salam')
    return <div className='scheduling'>
      <SchedulingSearch setSchedulingList={(schedulingList) => this.setSchedulingList(schedulingList)} />
      <HardDayModal onLogin={() => this.forceUpdate()} />
      <SchedulingWeek setSchedulingList={(schedulingList) => this.setSchedulingList(schedulingList)} />
      <SchedulingMonth setSchedulingList={(schedulingList) => this.setSchedulingList(schedulingList)} />
      <SchedulingList schedulingList={this.state.schedulingList} />
      <Button onClick={() => this.componentWillMount()}>{Strings.schedulingAll}</Button>
      <SchedulingToday/>
      <SchedulingRequest/>
    </div>
  }
}

export default SchedulingPage
