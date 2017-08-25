import React from 'react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'
import { Header, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import { Link } from 'react-router-dom'

import ExpenseList from './ExpenseList'
import AddExpense from './AddExpense'

class ExpenseHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expenseList: [],
    }
  }

  componentWillMount() {
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
            this.setState({expenseList: result.expenses})
          }
        })
    }
  }

  setExpenseList(expenseList) {
    this.setState({expenseList: expenseList})
  }

  render() {
    return <div>
      <ExpenseList expenseList={this.state.expenseList} setExpenseList={(expenseList) => this.setExpenseList(expenseList)} />
      <Header className='app__name'>{Strings.expenseInput}</Header>
      <AddExpense setExpenseList={(expenseList) => this.setExpenseList(expenseList)} />
    </div>
  }
}

export default ExpenseHome
