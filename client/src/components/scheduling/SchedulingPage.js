import React from 'react'

import { Grid,Form } from 'semantic-ui-react'
import SchedulingList from './SchedulingList'
import SchedulingRequest from './SchedulingRequest'
import SchedulingSearch from './SchedulingSearch'
import SchedulingWeek from './SchedulingWeek'
import SchedulingMonth from './SchedulingMonth'
import HardDayModal from './HardDayModal'
import SchedulingToday from './SchedulingToday'
import Strings from '../../localization'
import { Button } from 'semantic-ui-react'

import { Calendar, DatePicker } from 'react-persian-datepicker'

import MomentJ from 'moment-jalaali'
class SchedulingPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schedulingList: [],
      list: '',
      url:''
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

  search() {
    if (true) {
      fetch(this.state.url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }
  setSchedulingList (schedulingList) {
    this.setState({schedulingList: schedulingList})
  }
   setGender(event) {
    alert(event.target.value);
    this.setState({url:event.target.value})
  }
  render () {

    return <div className='scheduling'>
      <Grid centered>
        <Grid.Row columns={2}>
          <SchedulingToday/>
          {/*<HardDayModal onLogin={() => this.forceUpdate()}/>*/}
        </Grid.Row>
        <Grid.Row columns={4}>

      <div onChange={this.setGender.bind(this)}>
        <input type="radio" value='/scheduling/today/' name="gender"/> w
        <input type="radio" value='/scheduling/week/' name="gender"/>m
        <input type="radio" value='/scheduling/month/' name="gender"/> Female
      </div>

          {/*<DatePicker />*/}
          {/*<Calendar />*/}
          {/*<SchedulingWeek setSchedulingList={(schedulingList) => this.setSchedulingList(schedulingList)}/>*/}
          {/*<SchedulingMonth setSchedulingList={(schedulingList) => this.setSchedulingList(schedulingList)}/>*/}
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
