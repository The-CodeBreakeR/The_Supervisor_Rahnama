/**
 * Created by ali on 8/18/17.
 */

import React from 'react'
import { List, Modal, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import Cookie from 'browser-cookies'

class DelExpense extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  close() {
    this.setState({open: false})
  }

  updateExpense(result) {
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

  ButtonClickHandle() {
    if (Cookie.get('token')) {
      fetch('/accounting/delexpense/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          expenseID: this.props.expenseID,
        }),
      })
        .then(response => response.json())
        .then(result => this.updateExpense(result))
    }
  }

  render() {
    return <Button onClick={() => this.ButtonClickHandle()}>{Strings.delExpense}</Button>
  }
}

export default DelExpense
