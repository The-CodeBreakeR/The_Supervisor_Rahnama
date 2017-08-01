import React from 'react'

import SchedulingList from './SchedulingList'
import SchedulingRequest from './SchedulingRequest'
import SchedulingSearch from './SchedulingSearch'
import SchedulingWeek from './SchedulingWeek'
import SchedulingMonth from './SchedulingMonth'
import RegistrationModal from './RegistrationModal'

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
    return <div className='scheduling'>
      <SchedulingSearch setSchedulingList={(schedulingList) => this.setSchedulingList(schedulingList)} />
      <SchedulingWeek setSchedulingList={(schedulingList) => this.setSchedulingList(schedulingList)} />
      <SchedulingMonth setSchedulingList={(schedulingList) => this.setSchedulingList(schedulingList)} />
      <SchedulingList schedulingList={this.state.schedulingList} />
      <SchedulingRequest/>
      <RegistrationModal onLogin={() => this.forceUpdate()} />
    </div>
  }
}

export default SchedulingPage
