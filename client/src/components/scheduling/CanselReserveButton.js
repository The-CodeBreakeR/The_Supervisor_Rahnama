import React from 'react'
import { Button, Header, Icon, Image, Modal, Input } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class CanselReserveButton extends React.Component {
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

  ButtonClickHandle (schedulingId) {
    if (Cookie.get('token')) {
      fetch('/schedulings/decline/', {
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

  render () {
    return <Modal trigger={<Button
      negative onClick={() => this.ButtonClickHandle(this.props.schedulingId)} >{Strings.schedulingCansel}</Button>}
    open={this.state.open}
    onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.schedulingCansel}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <p>{this.state.message}</p>
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

export default CanselReserveButton
