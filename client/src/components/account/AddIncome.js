/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class AddIncome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      incAmount: '',
      incSource: '',
    }
  }

  updateIncome() {
    if (Cookie.get('token')) {
      fetch('/accounting/getincome/', {
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
            this.props.setIncomeList(result.incomes)
          } else {
            this.props.setIncomeList([])
          }
        })
    }
  }

  handleResult(result) {
    if (result.status === -1) {
      alert(Strings.submitionFailed)
    } else {
      alert(Strings.submitionOK)
    }
    this.updateIncome()
  }

  submit() {
    if (Cookie.get('token')) {
      fetch('/accounting/newincome/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          amount: this.state.incAmount,
          source: this.state.incSource,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else {
      alert(Strings.loginFirst)
    }
    this.onIncSource('')
    this.onIncAmount('')
  }

  onIncAmount(value) {
    this.setState({incAmount: value})
  }

  onIncSource(value) {
    this.setState({incSource: value})
  }

  render() {
    return <div>
      <Input value={this.state.incAmount} placeholder={Strings.incomeAmount} onChange={event => this.onIncAmount(event.target.value)}/>
      <Input value={this.state.incSource} placeholder={Strings.incomeSource} onChange={event => this.onIncSource(event.target.value)}/>
      <Button onClick={() => this.submit()}>{Strings.submitIncome}</Button>
    </div>
  }
}

export default AddIncome
