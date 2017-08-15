import React from 'react'

import { Grid, Form, Input } from 'semantic-ui-react'
import SchedulingList from './SchedulingList'
import SchedulingRequest from './SchedulingRequest'
import Strings from '../../localization'
import { Button } from 'semantic-ui-react'
import HardDayModal from './HardDayModal'
// import { Calendar, DatePicker } from 'react-persian-datepicker'

import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2'

import 'react-datepicker2/dist/react-datepicker2.min.css'
import MomentJ from 'moment-jalaali'
class SchedulingPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schedulingList: [],
      list: '',
      value: moment(),
      name: '',
      url: '/scheduling/all/',
      checked: 'all',
      page: 'main',
      // search: false,
    }
  }

  componentWillMount () {
    console.log('uu', this.state.name, this.state.url)
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
        // if(result.status === 0) {
        console.log('cmw', result.scheduling)
        this.setState({schedulingList: result.scheduling})
        // }else{
        //   alert("-1 status")
        // }
      })
  }

  // setSchedulingList(schedulingList) {
  //   this.setState({schedulingList: schedulingList})
  // }

  setUrl (event) {
    // console.log("ddd",{checked: event.target.value,name: '',url: '/scheduling/'+event.target.value+'/'})
    this.setState({
      url: '/scheduling/' + event.target.value + '/',
      checked: event.target.value,
      name: ''
    }, function () {this.componentWillMount()})
    // alert(this.state.url)
  }

  search (event) {
    // console.log("tt",event.target.value)
    this.setState({
      name: event.target.value,
      url: '/scheduling/search/',
      checked: 'search'
    }, function () {this.componentWillMount()})
    // this.setState({url: '/scheduling/search/'})
    // this.componentWillMount()
  }

  render () {
    alert(this.state.page)
    return <div className='scheduling'>
      {this.state.page === 'main' && <Grid centered>
        <Grid.Row columns={2}>
          <HardDayModal onLogin={() => this.forceUpdate()}/>
        </Grid.Row>
        <Grid.Row columns={4}>

          <div onChange={this.setUrl.bind(this)}>
            <Input type='radio' value='all' name='list'
                   checked={this.state.checked === 'all'}/> {Strings.schedulingAll} &emsp;
            <Input type='radio' value='today' name='list'
                   checked={this.state.checked === 'today'}/> {Strings.todayWorks} &emsp;
            <Input type='radio' value='week' name='list'
                   checked={this.state.checked === 'week'}/>{Strings.schedulingWeekDisplay} &emsp;
            <Input type='radio' value='month' name='list'
                   checked={this.state.checked === 'month'}/> {Strings.schedulingMonthDisplay} &emsp;
            <Input type='radio' value='search' name='list'
                   checked={this.state.checked === 'search'}/> {Strings.search} &emsp;
          </div>
          <div>
            {this.state.checked === 'search' && <Input value={this.state.name} placeholder={Strings.schedulingName}
                                                       onChange={event => this.search(event)}/>}
          </div>
        </Grid.Row>
        <Grid.Row centered>
          <SchedulingList schedulingList={this.state.schedulingList}/>
        </Grid.Row>
        <Grid.Row columns={2}>
          <button onClick={this.setState({page: 'request'})}>سلام{Strings.schedulingNewItem}</button>
        </Grid.Row>
      </Grid>
      }{this.state.page === 'request' &&
    <SchedulingRequest page={this.state.page}/>
    }</div>
  }
}

export default SchedulingPage
