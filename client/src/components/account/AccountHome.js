/**
 * Created by ali on 8/2/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'
import { Header } from 'semantic-ui-react'
import Strings from '../../localization'

import IncomeList from './IncomeList'
import AddIncome from './AddIncome'
import ExpenseList from './ExpenseList'
import AddExpense from './AddExpense'
import LoanRequest from './LoanRequest'
import LoanResponse from './LoanResponse'

class AccountHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      incomeList: [],
      expenseList: [],
    }
  }

  componentWillMount() {
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
            this.setState({incomeList: result.incomes})
          }
        })
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

  setIncomeList(incomeList) {
    this.setState({incomeList: incomeList})
  }

  setExpenseList(expenseList) {
    this.setState({expenseList: expenseList})
  }

  render() {
    return <div className='account'>
      <Header>{Strings.incomeTable}</Header>
      <IncomeList incomeList={this.state.incomeList} />
      <Header>{Strings.incomeInput}</Header>
      <AddIncome setIncomeList={(incomeList) => this.setIncomeList(incomeList)} />
      <Header>{Strings.expenseTable}</Header>
      <ExpenseList expenseList={this.state.expenseList} />
      <Header>{Strings.expenseInput}</Header>
      <AddExpense setExpenseList={(expenseList) => this.setExpenseList(expenseList)} />
      <Header>{Strings.loanRequestInput}</Header>
      <LoanRequest/>
      <Header>{Strings.loanResponseInput}</Header>
      <LoanResponse/>
    </div>
  }
}

export default AccountHome
