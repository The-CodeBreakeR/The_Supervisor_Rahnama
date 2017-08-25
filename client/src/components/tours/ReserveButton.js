import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class ReserveButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      status: 3,
      message: Strings.waitPlease,
      message2: '',
    }
  }
  handleResault(status) {
    this.setState({status: status})
    if (this.state.status === 0) {
      this.setState({message: Strings.requestSubmitAccept})
      this.setState({message2: Strings.doPayment})
    }
    if (this.state.status === -1) {
      this.setState({message: Strings.noCapacityTour})
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
  ButtonClickHandle(tourId) {
    if (Cookie.get('token')) {
      fetch('/tours/reserve/', {
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
        .then(result => this.handleResault(result.status))
    } else {
      this.setState({message: Strings.haveNotRegister})
    }
  }

  render() {
    return <Modal trigger={<Button primary onClick={() => this.ButtonClickHandle(this.props.tourId)}>{Strings.tourReserve}</Button>}
      open={this.state.open}
      onOpen={() => this.setState({ open: true })}
    >
      <Modal.Header>{Strings.tourReserve}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Header>{this.state.message}</Header>
          {this.state.message2}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        { (this.state.status !== 3) && <Button secondary onClick={() => this.close()}>
          {Strings.tourAccepted}
        </Button>}
      </Modal.Actions>
    </Modal>
  }
}

export default ReserveButton
