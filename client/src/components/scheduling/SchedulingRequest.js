import React from 'react'
import MomentJ from 'moment-jalaali'
import Strings from '../../localization'
import { Button, Header, Modal, Form, Message, Grid } from 'semantic-ui-react'
import '../../../stylesheet/basics.css'
import DatePicker from 'react-datepicker2'
import { formatError } from './utils'

class SchedulingRequest extends React.Component {
  constructor(props) {
    super(props)
    this.resetState()
    this.fields = ['name', 'end_date', 'capasity']
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
    let englishValue = ('' + value).replace('۰', '0').replace('۱', '1')
      .replace('۲', '2').replace('۳', '3').replace('۴', '4')
      .replace('۵', '5').replace('۶', '6').replace('۷', '7')
    let finalValue = /^\d+$/.test(englishValue) ? parseInt(englishValue) : 10
    this.setState({capasity: {value, error: !(finalValue > -1 && finalValue < 8)}})
  }

  onTimeChange(value) {
    let today = MomentJ()
    this.setState({end_date: {value, error: today.isAfter(this.state.end_date.value)}})
  }

  handleResult(result) {
    if (result.status === 0) {
      this.setState({error: ''})
      this.setState({accept: Strings.requestSubmitAccept})
    } else {
      this.setState({error: Strings.requestSubmitDecline})
      this.setState({accept: ''})
    }
    this.setState({request: ''})
  }

  resetState() {
    this.state = {
      capasity: {value: '', error: false},
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

  sendRequest() {
    fetch('/scheduling/request/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name.value,
        end_date: (this.state.end_date.value).toDate().getTime() / 1000, // Todo
        capasity: this.state.capasity.value,
        info: this.state.info,
      }),
    })
      .then(response => response.json())
      .then(result => {
        this.handleResult(result)
      })
  }

  close() {
    this.setState({open: false})
    this.resetState()
  }

  render() {
    const errors = this.generateErrors()
    const modal = <Modal closeIcon
      trigger={<Button color='blue' disabled={errors !== ''}
        onClick={() => this.sendRequest()}>{Strings.submit}</Button>}
      open={this.state.open} onOpen={() => this.setState({open: true})}
      onClose={() => this.setState({open: false})}
    >
      <Modal.Header>{Strings.acceptScheduling}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Header>{Strings.choose}</Header>
          <div style={{textAlign: 'center'}}>
            <Button onClick={() => this.props.setPage('main')}>
              {Strings.returnToScheduling}</Button>
            <Button onClick={() => this.close()}>{Strings.schedulingNewItem}</Button>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>

    return <div>

      <div className='request'>

        <Form>
          <Grid className='grid__request'>
            <Grid.Column >
              <Header>{Strings.schedulingNewItem}</Header>
              <Form.Input value={this.state.name.value}
                error={this.state.name.error}
                label={Strings.schedulingName}
                placeholder={Strings.needName}
                onChange={event => this.onNameChanged(event.target.value)}/>
              <label>{Strings.schedulingEndDatePick}</label>
              <DatePicker value={this.state.end_date.value}
                error={this.state.end_date.error}
                onChange={value => this.onTimeChange(value)}
                timePicker={false}
                placeholder={Strings.timeFormat}
                isGregorian={false}
              />
              <Form.Input label={Strings.schedulingCapasity}
                placeholder={Strings.needDay}
                value={this.state.capasity.value}
                error={this.state.capasity.error}
                onChange={event => this.onCapasityChanged(event.target.value)}/>

              <Form.TextArea value={this.state.info} label={Strings.info}
                placeholder={Strings.requestForScheduling}
                onChange={event => this.onInfoChange(event.target.value)}/>
              <Grid>
                <Grid.Row>
                  {modal}
                  <Form.Button id='stop' onClick={() => this.props.setPage('main')} negative>
                    {Strings.cansel}</Form.Button>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid>
        </Form>
        {errors && <Message
          error
          content={errors}
        />
        }

      </div>
    </div>
  }
}

export default SchedulingRequest
