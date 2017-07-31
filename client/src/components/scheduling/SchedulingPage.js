import React from 'react'

import SchedulingsList from './SchedulingsList'
import SchedulingsRequest from './SchedulingsRequest'
import SchedulingsSearch from './SchedulingsSearch'


class SchedulingsHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schedulingsList: [],
    }
  }

  componentWillMount() {
    fetch('/schedulings/search/', {
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
          this.setState({schedulingsList: result.schedulings})
        }
      })
  }

  setSchedulingsList(schedulingsList) {
    this.setState({schedulingsList: schedulingsList})
  }

  render() {
    return <div className='schedulings'>
      <SchedulingsSearch setSchedulingsList={(schedulingsList) => this.setSchedulingsList(schedulingsList)} />
      <SchedulingsList schedulingsList={this.state.schedulingsList} />
      <SchedulingsRequest/>
    </div>
  }
}

export default SchedulingsHome
