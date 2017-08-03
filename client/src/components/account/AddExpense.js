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
      incAmount: '',
      incDestination: '',
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
      fetch('/accommodation/newexpense/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          amount: this.state.incAmount,
          destination: this.state.incDestination,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else {
      alert(Strings.loginFirst)
    }
  }

  onIncAmount(value) {
    this.setState({incAmount: value})
  }

  onIncDestination(value) {
    this.setState({incDestination: value})
  }

  render() {
    return <div>
      <Input value={this.state.incAmount} placeholder={Strings.expenseAmount} onChange={event => this.onIncAmount(event.target.value)}/>
      <Input value={this.state.incDestination} placeholder={Strings.expenseDestination} onChange={event => this.onIncDestination(event.target.value)}/>
      <Button onClick={() => this.submit()}>{Strings.submitExpense}</Button>
    </div>
  }
}

export default AddExpense
