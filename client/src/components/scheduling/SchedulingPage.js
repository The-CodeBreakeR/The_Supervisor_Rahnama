import React from 'react'

import { Grid } from 'semantic-ui-react'
import SchedulingList from './SchedulingList'
import SchedulingRequest from './SchedulingRequest'
import SchedulingSearch from './SchedulingSearch'
import SchedulingWeek from './SchedulingWeek'
import SchedulingMonth from './SchedulingMonth'
import HardDayModal from './HardDayModal'
import SchedulingToday from './SchedulingToday'
import Strings from '../../localization'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

import DatePicker from 'react-datepicker2'

class SchedulingPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schedulingList: [],
    }
  }

  componentWillMount () {
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

  setSchedulingList (schedulingList) {
    this.setState({schedulingList: schedulingList})
  }

  render () {

    return <div className='scheduling'>
      <Grid centered>
        <Grid.Row columns={2}>
          <SchedulingToday/>
          <HardDayModal onLogin={() => this.forceUpdate()}/>
        </Grid.Row>
        <Grid.Row columns={3}>
          <SchedulingWeek setSchedulingList={(schedulingList) => this.setSchedulingList(schedulingList)}/>
          <SchedulingMonth setSchedulingList={(schedulingList) => this.setSchedulingList(schedulingList)}/>
          <SchedulingSearch setSchedulingList={(schedulingList) => this.setSchedulingList(schedulingList)}/>
        </Grid.Row>
        <Grid.Row centered>
          <SchedulingList schedulingList={this.state.schedulingList}/>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Button onClick={() => this.componentWillMount()}>{Strings.schedulingAll}</Button>
          <SchedulingRequest/>
        </Grid.Row>
      </Grid>
    </div>
  }
}

export default SchedulingPage
