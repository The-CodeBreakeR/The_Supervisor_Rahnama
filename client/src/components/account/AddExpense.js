/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class AddExpense extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expAmount: '',
      expDestination: '',
    }
  }

  updateExpense() {
    if (Cookie.get('token')) {
      fetch('/accounting/getexpense/', {
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
            this.props.setExpenseList(result.expenses)
          } else {
            this.props.setExpenseList([])
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
    this.updateExpense()
  }

  submit() {
    if (Cookie.get('token')) {
      fetch('/accounting/newexpense/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          amount: this.state.expAmount,
          destination: this.state.expDestination,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else {
      alert(Strings.loginFirst)
    }
    this.onExpDestination('')
    this.onExpAmount('')
  }

  onExpAmount(value) {
    this.setState({expAmount: value})
  }

  onExpDestination(value) {
    this.setState({expDestination: value})
  }

  render() {
    return <div>
      <Input value={this.state.expAmount} placeholder={Strings.expenseAmount} onChange={event => this.onExpAmount(event.target.value)}/>
      <Input value={this.state.expDestination} placeholder={Strings.expenseDestination} onChange={event => this.onExpDestination(event.target.value)}/>
      <Button onClick={() => this.submit()}>{Strings.submitExpense}</Button>
    </div>
  }
}

export default AddExpense
