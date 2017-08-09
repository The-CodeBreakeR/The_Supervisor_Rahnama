/**
 * Created by ali on 8/9/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'
import { Header, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import { Link } from 'react-router-dom'

import IncomeList from './IncomeList'
import AddIncome from './AddIncome'

class IncomeHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      incomeList: [],
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
    }
  }

  setIncomeList(incomeList) {
    this.setState({incomeList: incomeList})
  }

  render() {
    return <div>
      <Header>{Strings.incomeTable}</Header>
      <IncomeList incomeList={this.state.incomeList} />
      <Header>{Strings.incomeInput}</Header>
      <AddIncome setIncomeList={(incomeList) => this.setIncomeList(incomeList)} />
      <div className='account__back'>
        <Link to='/accounting'>
          <Button negative>{Strings.accountBack}</Button>
        </Link>
      </div>
    </div>
  }
}

export default IncomeHome
