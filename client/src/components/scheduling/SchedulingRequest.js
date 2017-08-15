import React from 'react'
import MomentJ from 'moment-jalaali'
import { Form, Message } from 'semantic-ui-react'
import Strings from '../../localization'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
// import { Calendar, DatePicker } from 'react-persian-datepicker';
import css from '../../../stylesheet/basics.css'
import DatePicker from 'react-datepicker2'

class SchedulingRequest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      capasity: 1,
      end_date: '',
      info: '',
      error: '',
      open: false,
      accept: '',
    }
  }

  onInfoChange (value) {
    this.setState({info: value})
  }

  onNameChange (value) {
    this.setState({name: value})
  }

  onCapasityChange (value) {
    this.setState({capasity: value})
  }

  onTimeChange (value) {
    console.log('here1')
    this.setState({end_date: value})
  }

  handleResult (result) {
    if (result.status === 0) {
      this.setState({error: ''})
      this.setState({accept: Strings.requestSubmitAccept})
    } else {
      this.setState({error: Strings.requestSubmitDecline})
      this.setState({accept: ''})
    }
    this.setState({request: ''})
  }

  sendRequest () {
    console.log('here')
    if (true) {
      this.setState({open: false})
      console.log(this.state.name)
      console.log(MomentJ(this.state.end_date, 'jYYYY/jMM/jDD').toDate().getTime() / 1000)
      console.log(this.state.info)
      console.log(this.state.capasity)
      fetch('/scheduling/request/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          end_date: MomentJ(this.state.end_date, 'jYYYY/jMM/jDD').toDate().getTime() / 1000,
          capasity: this.state.capasity,
          info: this.state.info,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }

  render () {
    console.log('gd', css)
    return <div>
      <Header>{Strings.schedulingNewItem}</Header>
      <div>
        <div>
          <Form>
            <Form.Input value={this.state.name} label={Strings.schedulingName}
                        placeholder={Strings.requestForScheduling}
                        onChange={event => this.onNameChange(event.target.value)}/>
            <Form.Input value={this.state.capasity} label={Strings.schedulingCapasity}
                        placeholder={Strings.requestForScheduling}
                        onChange={event => this.onCapasityChange(event.target.value)}/>
            <Form.Input value={this.state.capasity} label={Strings.schedulingCapasity}
                        placeholder={Strings.requestForScheduling}
                        onChange={event => this.onCapasityChange(event.target.value)}/>
            <DatePicker />
            <Form.Input value={this.state.end_date} label={Strings.schedulingEndDate} placeholder={Strings.timeFormat}
                        onChange={event => this.onTimeChange(event.target.value)}/>
            <Form.TextArea value={this.state.info} label={Strings.info} placeholder={Strings.requestForScheduling}
                           onChange={event => this.onInfoChange(event.target.value)}/>
            <Form.Button onClick={() => this.sendRequest()}>{Strings.submit}</Form.Button>
          </Form>
        </div>
      </div>
    </div>
  }
}

export default SchedulingRequest
