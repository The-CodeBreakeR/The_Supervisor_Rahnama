import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class ReserveButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      status: 3,
      message: Strings.waitPlease,
    }
  }
  handleResault(status) {
    this.setState({status: status})
    if (this.state.status === 0) {
      this.setState({message: Strings.requestSubmitAccept})
    }
    if (this.state.status === -1) {
      this.setState({message: Strings.noCapacityScheduling})
    }
  }
  resetState() {
    this.state = {
      message: Strings.waitPlease,
      status: 3,
    }
  }
  close() {
    this.setState({ open: false })
    this.resetState()
    this.props.getInfoRecall()
  }
  handleClose() {
    this.setState({close: false})
  }
  ButtonClickHandle(schedulingId) {
    if (Cookie.get('token')) {
      fetch('/scheduling/reserve/', {
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
        .then(result => this.handleResault(result.status))
    } else {
      this.setState({message: Strings.haveNotRegister})
    }
  }

  render() {
    return <Modal trigger={<Button primary onClick={() => this.ButtonClickHandle(this.props.schedulingId)}>{Strings.schedulingReserve}</Button>}
      open={this.state.open}
      onOpen={() => this.setState({ open: true })}
    >
      <Modal.Header>{Strings.schedulingReserve}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Header>{this.state.message}</Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        { (this.state.status !== 3) && <Button onClick={() => this.close()}>
          {Strings.schedulingAccepted}
        </Button>}
      </Modal.Actions>
    </Modal>
  }
}

export default ReserveButton
