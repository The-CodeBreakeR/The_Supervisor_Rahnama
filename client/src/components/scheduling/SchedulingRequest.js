import React from 'react'
import MomentJ from 'moment-jalaali'
import * as moment from 'jalali-moment';
import Strings from '../../localization'
import { Button, Header, Image, Modal, Label , Form, Message} from 'semantic-ui-react'
import css from '../../../stylesheet/basics.css'
import DatePicker from 'react-datepicker2'
import { formatError, getUser } from './utils'

class SchedulingRequest extends React.Component {
  constructor(props){

    super(props)
    this.resetState()
    this.fields = ['name','end_date','capasity']

  }

  validate(){
    this.onNameChanged(this.state.name.value)
  }

  generateErrors() {
    let errors = this.state.error
    if (this.state.name.error) {
      errors += formatError(Strings.eventNameError)
    }
    if (this.state.capasity.error) {
      errors += formatError(Strings.capasityError)
    }
    if (this.state.end_date.error) {
      errors += formatError(Strings.endDateError)
    }
    return errors
  }

  isOK() {
    for (const field of this.fields) {
      if (!this.state[field].value || this.state[field].error) {
        return false
      }
    }
    return true
  }

  onNameChanged(value) {
    this.setState({name: {value, error: value.length < 3}})
  }

  onInfoChange(value) {
    this.setState({info: value})
  }

  onCapasityChanged(value) {
    // this.setState({capasity: {value, error: true ‌}})
    this.setState({capasity: {value, error: !(value > 0 && value < 7) }})
  }

  onTimeChange(value) {
    console.log('here1')
    var moment = require('moment-jalaali')
    let today =  MomentJ('jYYYY/jM/jD').toDate().getTime()
    console.log("k",today)
    let pickedDay =  MomentJ(this.state.end_date.value, 'jYYYY/jMM/jDD').toDate().getTime()
     console.log(pickedDay)
    this.setState({end_date: {value, error: Date.parse(today) > Date.parse(pickedDay)  }})
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

  resetState () {
    this.state = {
      // name: '',
      capasity: {value: null, error: false},
      end_date: {value: '', error: false},
      info: '',
      error: '',
      open: false,
      accept: '',
      name: {value: '', error: false},
      url: '',
      done: false,
    }
  }

  sendRequest () {

    console.log('here')
    if (true) {
      // is.setState({open: false})
      console.log(this.state.name)
      console.log(MomentJ(this.state.end_date.value, 'jYYYY/jMM/jDD').toDate().getTime() / 1000)
      console.log(this.state.info)
      console.log('ok?', this.isOK())

      if (this.isOK()) {
        fetch('/scheduling/request/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name.value,
            end_date: MomentJ(this.state.end_date, 'jYYYY/jMM/jDD').toDate().getTime() / 1000,
            capasity: this.state.capasity.value,
            info: this.state.info,
          }),
        })
          .then(response => response.json())
          .then(result => {
            this.handleResult(result)
            // this.props.setPage('main')
          })
      }
      else this.validate()
    }
  }

  close () {
    // this.setState({open: false})
    this.resetState()
    // this.props.setPage('request')
  }

  render () {
    console.log('gd', css)
    const errors = this.generateErrors()
    const modal = <Modal closeIcon
                         trigger={<Button disabled={errors !== ''}
                                          onClick={() => this.sendRequest()}>{Strings.submit}</Button>}
                         open={this.state.open} onOpen={() => this.setState({open: true})}
                         onClose={() => this.setState({open: false})}
    >
      <Modal.Header>{Strings.acceptScheduling}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Header>{Strings.choose}</Header>
          <Button onClick={() => this.props.setPage('main')}>
            {Strings.returnToScheduling}</Button>
          <Button onClick={() => this.close()}>{Strings.schedulingNewItem}</Button>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>

    return <div>

      <Header>{Strings.schedulingNewItem}</Header>
      <div>
        <div>
          <Form>
            <Form.Input value={this.state.name.value}
                        error={this.state.name.error}
                        label={Strings.schedulingName}
                        placeholder={Strings.needName}
                        onChange={event => this.onNameChanged(event.target.value)}/>
            <Form.Input label={Strings.schedulingCapasity}
                        placeholder={Strings.needDay}
                        value={this.state.capasity.value}
                        error={this.state.capasity.error}
                        onChange={event => this.onCapasityChanged(event.target.value)}/>
            {/*<Label content={Strings.schedulingEndDate}/>*/}
            <label>{Strings.schedulingEndDatePick}</label>
            <DatePicker value={this.state.end_date.value}
                        error={this.state.end_date.error}
                        onChange={value => this.onTimeChange(value)}
                        timePicker={false}
                        placeholder={Strings.timeFormat}
                        isGregorian={false}
              // label={Strings.schedulingEndDate}
            />
            <Form.TextArea value={this.state.info} label={Strings.info}
                           placeholder={Strings.requestForScheduling}
                           onChange={event => this.onInfoChange(event.target.value)}/>

            {modal}
            <Form.Button onClick={() => this.props.setPage('main')}>
              {Strings.cansel}</Form.Button>
          </Form>
          {errors && <Message
            error
            content={errors}
          />
          }
        </div>
      </div>
    </div>
  }
}

export default SchedulingRequest
