import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button, Modal } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class LoanRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reqAmount: '',
      reqPurpose: '',
      pageResponse: Strings.loginFirst,
      open: false,
    }
  }

  close() {
    this.setState({open: false})
  }

  updateRequest() {
    if (Cookie.get('token')) {
      fetch('/accounting/getrequest/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
        }),
      })
        .then(response => response.json())
        .then(result => {
          if (result.status === 0) {
            this.props.setRequestList(result.requests)
          } else {
            this.props.setRequestList([])
          }
        })
    }
  }

  handleResult(result) {
    if (result.status === -1) {
      this.setState({pageResponse: Strings.submitionFailed})
    } else {
      this.setState({pageResponse: Strings.submitionOK})
    }
    this.updateRequest()
  }

  submit() {
    if (Cookie.get('token')) {
      if (this.state.reqAmount.match(/^\d+$/)) {
        fetch('/accounting/loanrequest/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: JSON.parse(localStorage.getItem('user')).token,
            amount: this.state.reqAmount,
            purpose: this.state.reqPurpose,
          }),
        })
          .then(response => response.json())
          .then(result => this.handleResult(result))
      } else {
        this.setState({pageResponse: Strings.invalidMoney})
      }
    } else {
      this.setState({pageResponse: Strings.loginFirst})
    }
    this.onReqAmount('')
    this.onReqPurpose('')
  }

  onReqAmount(value) {
    this.setState({reqAmount: value})
  }

  onReqPurpose(value) {
    this.setState({reqPurpose: value})
  }

  render() {
    return <div>
      <Input className='account__input' value={this.state.reqAmount} placeholder={Strings.requestAmount} onChange={event => this.onReqAmount(event.target.value)}/>
      <Input className='account__input account__addr' value={this.state.reqPurpose} placeholder={Strings.requestPurpose} onChange={event => this.onReqPurpose(event.target.value)}/>
      <Modal trigger={<Button primary onClick={() => this.submit()}>{Strings.submitRequest}</Button>}
        open={this.state.open}
        onOpen={() => this.setState({open: true})}
      >
        <Modal.Header>{Strings.submitRequest}</Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description className='account__newline'>
            {this.state.pageResponse}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={() => this.close()}>
            {Strings.accountBack}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  }
}

export default LoanRequest
