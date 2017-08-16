import React from 'react'
import MomentJ from 'moment-jalaali'
import { Form, Message } from 'semantic-ui-react'
import Strings from '../../localization'
import { Button, Header, Image, Modal,Label,Message } from 'semantic-ui-react'
import css from '../../../stylesheet/basics.css'
import DatePicker from 'react-datepicker2'
// import Label from 'semantic-ui-react/src/elements/Label/Label'
// import chooseRequest from './chooseRequest'

class SchedulingRequest extends React.Component {
  constructor (props) {

    super(props)
     this.resetState()
    this.state = {
      name: '',
      capasity: null,
      end_date: '',
      info: '',
      error: '',
      open: false,
      accept: '',
    }
  }


    generateErrors() {
    let errors = this.state.error
    if (this.state.fatherName.error) {
      errors += formatError(Strings.fatherNameError)
    }
    if (this.state.birthDate.error) {
      errors += formatError(Strings.birthDateError)
    }
    if (this.state.birthPlace.error) {
      errors += formatError(Strings.birthPlaceError)
    }
    if (this.state.nationalId.error) {
      errors += formatError(Strings.nationalIdError)
    }
    if (this.state.mobileNumber.error) {
      errors += formatError(Strings.mobileNumberError)
    }
    if (this.state.landlineNumber.error) {
      errors += formatError(Strings.landlineNumberError)
    }
    if (this.state.maritalStatus.error) {
      errors += formatError(Strings.maritalStatusError)
    }
    if (this.state.address.error) {
      errors += formatError(Strings.addressError)
    }
    return errors
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

  sendRequest() {
    
    console.log('here')
    if (true) {
      // this.setState({open: false})
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
        .then(result => {
          this.handleResult(result)
          // this.props.setPage('main')
        })
    }
  }
  close(){
   // this.setState({open: false})
    this.setState({
      name: '',
      capasity: '',
      end_date: '',
      info: '',
      // error: '',
      open: false,
      // accept: '',
    })
    // this.props.setPage('request')
  }

  render(){
    console.log('gd', css)
    const modal = <Modal closeIcon
                  trigger={<Button onClick={() => this.sendRequest()}>{Strings.submit}</Button>}
                         open={this.state.open} onOpen={() => this.setState({open: true})}
        onClose={() => this.setState({open: false})}
    >
      <Modal.Header>{Strings.acceptScheduling}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Header>{Strings.choose}</Header>
            <Button onClick={() => this.props.setPage('main')}>{Strings.returnToScheduling}</Button>
            <Button onClick={() =>this.close()}>{Strings.schedulingNewItem}</Button>
          </Modal.Description>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>

    return <div>

      <Header>{Strings.schedulingNewItem}</Header>
      <div>
        <div>
          <Form>
            <Form.Input value={this.state.name} label={Strings.schedulingName}
                        placeholder={Strings.needName}
                        onChange={event => this.onNameChange(event.target.value)}/>
            <Form.Input value={this.state.capasity} label={Strings.schedulingCapasity}
                        placeholder={Strings.needDay}
                        onChange={event => this.onCapasityChange(event.target.value)}/>
            {/*<Label content={Strings.schedulingEndDate}/>*/}
            <label>{Strings.schedulingEndDatePick}</label>
            <DatePicker value={this.state.end_date}
                        onChange={value => this.setState({end_date: value})}
                        timePicker={false}
                        placeholder={Strings.timeFormat}
                        isGregorian={false}
                        // label={Strings.schedulingEndDate}
            />
            <Form.TextArea value={this.state.info} label={Strings.info} placeholder={Strings.requestForScheduling}
                           onChange={event => this.onInfoChange(event.target.value)}/>

            {modal}
            <Form.Button onClick={() => this.props.setPage('main')}>{Strings.cansel}</Form.Button>
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
