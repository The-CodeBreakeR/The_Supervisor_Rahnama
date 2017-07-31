import React from 'react'
import { Button, Header, Icon, Image, Modal, Input } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class PaymentButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      status: 0,
      message: '',
      messageStatus: 0,
      input: '',
    }
  }

  handleResault (status) {
    this.setState({status: 1})
    this.setState({message: Strings.requestSubmitAccept})
  }

  resetState () {
    this.state = {
      message: '',
      status: 0,
      messageStatus: 0,
      input: '',
    }
  }

  close() {
    this.setState({open: false})
    this.resetState()
    this.props.getInfoRecall()
  }

  handleClose () {
    this.setState({close: false})
  }
  handleButtonClick(schedulingId) {
    if (this.state.input.match(/^\d+$/)) {
      this.setState({messageStatus: 0})
      this.ButtonClickHandle(schedulingId)
    } else {
      this.setState({messageStatus: 1})
    }
  }
  ButtonClickHandle (schedulingId) {
    if (Cookie.get('token')) {
      fetch('/schedulings/payment/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          schedulingId: schedulingId,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResault())
    } else {
      this.setState({message: Strings.haveNotRegister})
    }
  }
  onInputChange(value) {
    this.setState({input: value})
  }
  render() {
    return <Modal trigger={<Button
      positive >{Strings.schedulingPayment}</Button>}
    open={this.state.open}
    onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.schedulingPayment}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          {this.state.status === 0 && <Input value={this.state.input} placeholder={Strings.schedulingBankCode} onChange={event => this.onInputChange(event.target.value)}/>}
          {this.state.status === 0 && <Button onClick={() => this.handleButtonClick(this.props.schedulingId)}>
            {Strings.submit}</Button>}
          {this.state.messageStatus === 1 && <p>{Strings.errorPayment}</p>
          }
          {this.state.status === 1 && <p>{this.state.message}</p>}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => this.close()}>
          {Strings.schedulingStop}
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default PaymentButton
