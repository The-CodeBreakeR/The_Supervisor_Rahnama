import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class RequestFollowUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      resp: Strings.NoResponse,
    }
  }

  close() {
    this.setState({open: false})
  }

  handleResult(result) {
    if (result.status === -1) {
      this.setState({resp: Strings.NoResponse})
    } else {
      this.setState({resp: result.answer + '\n' + Strings.repPer + result.repayment_period + '\n' +
        Strings.repRate + result.repayment_rate})
    }
  }

  ButtonClickHandle() {
    if (Cookie.get('token')) {
      fetch('/accounting/response/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          requestID: this.props.reqID,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }

  render() {
    return <Modal trigger={<Button onClick={() => this.ButtonClickHandle()}>{Strings.followUp}</Button>}
      open={this.state.open}
      onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.followUp}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description className='account__newline'>
          {this.state.resp}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => this.close()}>
          {Strings.accountBack}
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default RequestFollowUp
