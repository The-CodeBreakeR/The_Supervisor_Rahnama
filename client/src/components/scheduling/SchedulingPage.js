import React from 'react'

import { Grid,Form,Input } from 'semantic-ui-react'
import SchedulingList from './SchedulingList'
import SchedulingRequest from './SchedulingRequest'
import SchedulingSearch from './SchedulingSearch'
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
      name: '',
      url:'/scheduling/search/',
    }
  }

  componentWillMount () {
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
        if (result.status === 0) {
          this.setState({schedulingList: result.scheduling})
        }
      })
  }

  setSchedulingList(schedulingList) {
    this.setState({schedulingList: schedulingList})
  }

   setUrl(event){
    this.setState({name:''})
    // alert(event.target.value)
    this.setState({url:event.target.value})
    this.componentWillMount ()
  }
  search(event){
     this.setState({url:'/scheduling/search/'})
     this.componentWillMount()
  }
  render(){
    return <div className='scheduling'>
      <Grid centered>
        <Grid.Row columns={2}>
        </Grid.Row>
        <Grid.Row columns={4}>

      <div onChange={this.setUrl.bind(this)}>
        <Input type="radio" value='/scheduling/search/' name="gender" /> all
        <Input type="radio" value='/scheduling/today/' name="gender"/> w
        <Input type="radio" value='/scheduling/week/' name="gender"/>m
        <Input type="radio" value='/scheduling/month/' name="gender"/> Female
      </div>
       <div>
        <Input value={this.state.name} placeholder={Strings.schedulingName} onChange={event =>this.setState({name:event.target.value})}/>
        <Button onClick={() => this.search()}>{Strings.search}</Button>
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
