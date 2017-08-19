import React from 'react'

import { Grid, Segment, Input, Header,Table } from 'semantic-ui-react'
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
        console.log('cmw', result.scheduling)
        this.setState({schedulingList: result.scheduling})
      })
  }

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
    this.setState({
      name: event.target.value,
      url: '/scheduling/search/',
      checked: 'search'
    }, function () {this.componentWillMount()})
  }

  setPage (page) {
    this.setState({page: page})
    this.componentWillMount()
  }

  render () {
    console.log('av', this.state.page)
    return <div className='scheduling'>
      {this.state.page === 'main' && <Grid centered>
        <Grid.Column className='column__1'>
          <Grid.Row>
            <Header>{Strings.event}</Header>
            <p>{Strings.eventListInfo}</p>
            <div className='select__menu'>
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
              {this.state.checked === 'search' && <Input value={this.state.name} placeholder={Strings.schedulingName}
                                                         onChange={event => this.search(event)}/>}
            </div>

          </Grid.Row>
          <Grid.Row centered>
            <br/>
            <SchedulingList schedulingList={this.state.schedulingList}/>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column className='column__2'>
          <div className="scheduling__box1">
          <div >
          <Table basic='very' celled selectable className="scheduling__box">
            <Table.Header >
              <Table.Row>
                <Table.HeaderCell className='Header'>{Strings.schedulingNewItem1}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body className="body">
              <div className="body">
              <p>{Strings.schedulingNewItem2}</p>
              {/*<Table.Row>*/}
                  <Button onClick={() => this.setState({page: 'request'})}>{Strings.schedulingNewItem}</Button>
                {/*</Table.Row>*/}
              </div>
            </Table.Body>
          </Table>
          </div>
          <HardDayModal onLogin={() => this.forceUpdate()}/>
          </div>
        </Grid.Column>
      </Grid>
      }{this.state.page === 'request' &&
    <SchedulingRequest setPage={page => this.setPage(page)}/>
    }</div>
  }
}

export default SchedulingPage
