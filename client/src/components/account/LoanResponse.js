/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class LoanResponse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reqID: '',
    }
  }

  handleResult(result) {
    if (result.status === -1) {
      alert(Strings.submitionFailed)
    } else {
      alert(result.answer + '\n' + Strings.repPer + result.repayment_period + '\n' +
        Strings.repRate + result.repayment_rate)
    }
  }

  submit() {
    if (Cookie.get('token')) {
      fetch('/accounting/response/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          requestID: this.state.reqID,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else {
      alert(Strings.loginFirst)
    }
  }

  onReqID(value) {
    this.setState({reqID: value})
  }

  render() {
    return <div>
      <Input value={this.state.reqID} placeholder={Strings.requestCode} onChange={event => this.onReqID(event.target.value)}/>
      <Button onClick={() => this.submit()}>{Strings.viewResult}</Button>
    </div>
  }
}

export default LoanResponse
