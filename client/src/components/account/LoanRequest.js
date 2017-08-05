/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class LoanRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reqAmount: '',
      reqPurpose: '',
    }
  }

  handleResult(result) {
    if (result.status === -1) {
      alert(Strings.submitionFailed)
    } else {
      alert(Strings.requestOK + result.id)
    }
  }

  submit() {
    if (Cookie.get('token')) {
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
      alert(Strings.loginFirst)
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
      <Button primary onClick={() => this.submit()}>{Strings.submitRequest}</Button>
    </div>
  }
}

export default LoanRequest
