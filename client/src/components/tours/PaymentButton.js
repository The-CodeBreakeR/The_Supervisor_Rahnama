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

  ButtonClickHandle (tourId) {
    if (Cookie.get('token')) {
      fetch('/tours/payment/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          tourId: tourId,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResault())
    } else {
      this.setState({message: Strings.haveNotRegister})
    }
  }

  render () {
    return <Modal trigger={<Button
      positive /*onClick={() => this.ButtonClickHandle(this.props.tourId)}*/ >{Strings.tourPayment}</Button>}
    open={this.state.open}
    onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.tourPayment}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          {this.state.status === 0 && <Input action={Strings.submit} placeholder={Strings.tourBankCode}/>}
          {this.state.status === 1 && <p>{this.state.message}</p>}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => this.close()}>
          {Strings.tourStop}
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default PaymentButton
