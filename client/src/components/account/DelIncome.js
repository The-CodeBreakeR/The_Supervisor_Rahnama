/**
 * Created by ali on 8/18/17.
 */

import React from 'react'
import { List, Modal, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import Cookie from 'browser-cookies'

class DelIncome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  close() {
    this.setState({open: false})
  }

  updateIncome(result) {
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

  ButtonClickHandle() {
    if (Cookie.get('token')) {
      fetch('/accounting/delincome/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          incomeID: this.props.incomeID,
        }),
      })
        .then(response => response.json())
        .then(result => this.updateIncome(result))
    }
  }

  render() {
    return <Button onClick={() => this.ButtonClickHandle()}>{Strings.delIncome}</Button>
  }
}

export default DelIncome
