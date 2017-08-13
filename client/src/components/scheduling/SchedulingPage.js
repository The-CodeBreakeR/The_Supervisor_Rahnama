import React from 'react'

import { Grid, Form, Input } from 'semantic-ui-react'
import SchedulingList from './SchedulingList'
import SchedulingRequest from './SchedulingRequest'
import Strings from '../../localization'
import { Button } from 'semantic-ui-react'
import HardDayModal from './HardDayModal'
import { Calendar, DatePicker } from 'react-persian-datepicker'

import MomentJ from 'moment-jalaali'
class SchedulingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schedulingList: [],
      list: '',
      name: '',
      url: '/scheduling/all/',
      checked: 'all',
      search: false,
    }
  }

  componentWillMount() {
    fetch(this.state.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if(result.status === 0) {
          this.setState({schedulingList: result.scheduling})
        }
      })
  }

  setSchedulingList(schedulingList) {
    this.setState({schedulingList: schedulingList})
  }

  setUrl(event) {
    this.setState(checked: 'value')
    this.setState({name: ''})
    this.setState({url: '/scheduling/'+event.target.value+'/'})
    this.componentWillMount()
  }

  search(event) {
    this.setState({name: event.target.value})
    this.setState({url: '/scheduling/search/'})
    this.componentWillMount()
  }

  render() {
    return <div className='scheduling'>
      <Grid centered>
        <Grid.Row columns={2}>
           <HardDayModal onLogin={() => this.forceUpdate()}/>
        </Grid.Row>
        <Grid.Row columns={4}>

          <div onChange={this.setUrl.bind(this)}>
            <Input type='radio' value='search' name='list' checked={this.state.checked = 'all'}/> all
            <Input type='radio' value='today' name='list' checked={this.state.checked = 'today'}/> w
            <Input type='radio' value='week' name='list' checked={this.state.checked = 'week'}/>m
            <Input type='radio' value='month' name='list' checked={this.state.checked = 'month'}/> Female
            {/*<Input type='radio' value='all' name='list' onClick={this.setState({search:true})} /> search*/}
          </div>
          <div>
            {this.state.search && <Input value={this.state.name} placeholder={Strings.schedulingName}
                   onChange={event => this.search(event)}/>}
          </div>
        </Grid.Row>
        <Grid.Row centered>
          <SchedulingList schedulingList={this.state.schedulingList}/>
        </Grid.Row>
        <Grid.Row columns={2}>
          <SchedulingRequest/>
        </Grid.Row>
      </Grid>
    </div>
  }
}

export default SchedulingPage
