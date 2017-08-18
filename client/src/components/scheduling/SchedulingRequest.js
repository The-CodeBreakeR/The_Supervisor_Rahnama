import React from 'react'
import MomentJ from 'moment-jalaali'
import Strings from '../../localization'
import { Button, Header, Modal, Form, Message } from 'semantic-ui-react'
import css from '../../../stylesheet/basics.css'
import DatePicker from 'react-datepicker2'
import { formatError, getUser } from './utils'

class SchedulingRequest extends React.Component {
  constructor (props) {

    super(props)
    this.resetState()
    this.fields = ['name', 'end_date', 'capasity']

  }
  //
  // validate () {
  //   this.onNameChanged(this.state.name.value)
  // }

  generateErrors () {
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

  isOK () {
    for (const field of this.fields) {
      if (!this.state[field].value || this.state[field].error) {
        return false
      }
    }
    return true
  }

  onNameChanged (value) {
    this.setState({name: {value, error: value.length < 3}})
  }

  onInfoChange (value) {
    this.setState({info: value})
  }

  onCapasityChanged (value) {
    console.log('value0', value)
    let englishValue = ('' + value).replace('۰', '0').replace('۱', '1')
      .replace('۲', '2').replace('۳', '3').replace('۴', '4')
      .replace('۵', '5').replace('۶', '6').replace('۷', '7')
    console.log('value1', englishValue)
    let finalValue = /^\d+$/.test(englishValue) ? parseInt(englishValue) : 10
    console.log('value2', finalValue)
    this.setState({capasity: {value, error: !(finalValue > -1 && finalValue < 8)}})
  }

  onTimeChange (value) {
    let today = MomentJ()
    this.setState({end_date: {value, error: today.isAfter(this.state.end_date.value)}})
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
      console.log(this.state.name.value)
      console.log(this.state.end_date.value)
      console.log(MomentJ(this.state.end_date.value, 'jYYYY/jMM/jDD'))
      console.log(this.state.info)
      console.log('ok?', this.isOK())

      fetch('/scheduling/request/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name.value,
          // end_date: MomentJ(this.state.end_date, 'jYYYY/jMM/jDD').toDate().getTime() / 1000,
          end_date: (this.state.end_date.value).toDate().getTime() /1000 ,//todo
          capasity: this.state.capasity.value,
          info: this.state.info,
        }),
      })
        .then(response => response.json())
        .then(result => {
          this.handleResult(result)
        })

    }
  }

  close () {
    this.setState({open: false}
    this.resetState()
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
            <label>{Strings.schedulingEndDatePick}</label>
            <DatePicker value={this.state.end_date.value}
                        error={this.state.end_date.error}
                        onChange={value => this.onTimeChange(value)}
                        timePicker={false}
                        placeholder={Strings.timeFormat}
                        isGregorian={false}
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
